import {Component, OnDestroy, OnInit} from '@angular/core';
import RTCPeerConnection from 'webrtc-adapter';
import JsSIP from 'jssip';
import {CommonService} from '../../../services/common.service';
import {Router} from '@angular/router'

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
  imageUrl: string;
  usersMessage: string;

  constructor(private common: CommonService, private router: Router) {
  }

  ngOnInit() {
    const that = this;
    this.service = this.common.storage.getItem('serviceId');

    this.common.connectionEvents.on('text', function (data) {
      that.messages.push(data);
    });
    this.common.connectionEvents.on('messages', function (data) {
      that.messages = data.concat(that.messages);
      that.page -= 1;
    });
    this.common.connectionEvents.on('connectedToChat', function (data) {
      that.page = data.page;
      that.common.connection.send(JSON.stringify({
        action: 'history',
        params: {
          id: that.service,
          page: that.page
        }
      }));
    });

    if (this.common.logged) {
      this.initChat();
    } else {
      setTimeout(function () {
        that.initChat();
      }, 2000);
    }

    this.hideDropUpMenu();
  }

  ngOnDestroy() {
    this.common.connectionEvents.removeAllListeners();
  }

  onUpload(event) {
    this.imageUrl = '';
    if (event.target.files && event.target.files[0]) {
      let reader = new FileReader();
      reader.onloadend = (e: any) => {
        this.imageUrl = e.target.result;
        this.messages.push({
          id: '',
          who: this.CLIENT,
          type: 'image',
          content: this.imageUrl,
          date: new Date(),
          sent: true,
          read: true
        });
      };
      reader.readAsDataURL(event.target.files[0]);
    }
  }

  initChat() {
    const that = this;
    console.log('Try init chat');
    this.common.connection.send(JSON.stringify({
      action: 'initChat',
      params: {
        id: that.service
      }
    }));
  }

  sendMessage(type: string = 'text') {
    this.common.connection.send(JSON.stringify({
      action: 'text',
      params: {
        chat: this.service,
        type: type,
        content: this.usersMessage
      }
    }));
  }

  goToGeoLocation() {
    this.router.navigate(['geolocation'])
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
