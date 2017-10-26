import {Component, OnDestroy, OnInit} from '@angular/core';
import RTCPeerConnection from 'webrtc-adapter';
import JsSIP from 'jssip';
import {CommonService} from '../../../services/common.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit, OnDestroy {

  /**
   * Project constants for user types (may be client or operator)
   */
  OPERATOR = 'operator';
  CLIENT = 'client';

  TYPE_TEXT = 'text';
  TYPE_IMAGE = 'image';
  TYPE_SUBMIT = 'submit';

  /**
   * Constants for user statuses
   */
  ONLINE = 'Онлайн';
  OFFLINE = 'Отсутствует';
  TYPING = 'Печатает...';

  /**
   * @type {[{id: string; who: string; type: string; content: string; date: string; sent: boolean; read: boolean}]}
   */
  messages = [];

  /**
   * @type {string} Operator name
   */
  name = '';

  /**
   * @type {string} Operator text statuses
   */
  status = this.OFFLINE;

  /**
   * Service number from CRM
   * @type {number}
   */
  service = null;

  /**
   * Current page
   * @type {number}
   */
  page: number;

  /**
   * @param common
   */

  image: string;
  usersMessage: string;

  constructor(private common: CommonService, private router: Router) {
  }

  ngOnInit() {
    const $this = this;
    this.service = this.common.storage.getItem('serviceId');

    this.common.connectionEvents.on('text', function (data) {
      if (data.type === $this.TYPE_SUBMIT) {
        if (data.content === null) {
          // Запрос на crm
        }
      }
      console.log(data);
      $this.messages.push(data);
    });
    this.common.connectionEvents.on('updateText', function (data) {
      const index = $this.messages.findIndex(function (message) {
        return message.id === data.id;
      });

      if (-1 !== index) {
        $this.messages[index] = data;
      }
    });
    this.common.connectionEvents.on('messages', function (data) {
      $this.messages = data.concat($this.messages);
      $this.page--;

      if ($this.messages.length < 10) {
        $this.loadMessages();
      }
    });
    this.common.connectionEvents.on('connectedToChat', function (data) {
      $this.page = data.page;
      $this.loadMessages();
    });
    this.common.connectionEvents.on('operatorConnected', function (data) {
      $this.name = data.name;
      $this.status = data.status;
    });

    if (this.common.logged) {
      this.initChat();
    } else {
      setTimeout(function () {
        $this.initChat();
      }, 2000);
    }

    this.hideDropUpMenu();
  }

  ngOnDestroy() {
    this.common.connectionEvents.removeAllListeners('text');
    this.common.connectionEvents.removeAllListeners('messages');
    this.common.connectionEvents.removeAllListeners('connectedToChat');
    this.common.connectionEvents.removeAllListeners('operatorConnected');
  }

  onUpload(event) {
    if (event.target.files && event.target.files[0]) {
      let reader = new FileReader();
      reader.onloadend = (e: any) => {
        this.sendMessage('image', e.target.result);

        let formData = new FormData();
        formData.append('filename', event.target.files[0]);
        const url = 'orderimage=' + this.common.currentOrderId + '&filename=' + event.target.files[0].name;
        this.common.sendImage(url, formData).subscribe(data => {
          console.log(data)
        });
      };
      reader.readAsDataURL(event.target.files[0]);
    }
  }

  initChat() {
    const $this = this;
    console.log('Try init chat');
    this.common.connection.send(JSON.stringify({
      action: 'initChat',
      params: {
        id: $this.service
      }
    }));
  }

  loadMessages() {
    if (this.page < 1) {
      return;
    }

    this.common.connection.send(JSON.stringify({
      action: 'history',
      params: {
        id: this.service,
        page: this.page
      }
    }));
  }

  sendMessage(type: string = 'text', content: string = null) {
    this.common.connection.send(JSON.stringify({
      action: 'text',
      params: {
        chat: this.service,
        type: type,
        content: content || this.usersMessage
      }
    }));
  }

  changeMessage(id: string, content: any) {
    this.common.connection.send(JSON.stringify({
      action: 'editText',
      params: {
        chat: this.service,
        id: id,
        content: content
      }
    }));
  }

  goToGeoLocation() {
    this.router.navigate(['geolocation'])
  }

  goToMainPage(){
    this.router.navigate([''])
  }

  hideDropUpMenu() {
    let dropUp = document.getElementById('dropUp');
    dropUp.style.display = 'none';
  }

  toggleDropUp() {
    let dropUp = document.getElementById('dropUp');
    if (dropUp.style.display === 'none') {
      dropUp.style.display = 'block';
    } else {
      dropUp.style.display = 'none';
    }
  }

  closeDropUpOuter() {
    let dropUp = document.getElementById('dropUp');
    if (dropUp.style.display === 'block') {
      dropUp.style.display = 'none';
    }
  }

}
