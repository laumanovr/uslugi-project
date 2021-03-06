import {Component, OnDestroy, OnInit, ElementRef} from '@angular/core';
import RTCPeerConnection from 'webrtc-adapter';
import JsSIP from 'jssip';
import {CommonService} from '../../../services/common.service';
import {Router} from '@angular/router';
import {Location} from '@angular/common';

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

  usersMessage: string;
  modal = false;
  audioModal = false;
  videoModal = false;

  constructor(public common: CommonService,
              private router: Router,
              private location: Location,
              private _elementRef: ElementRef
  ){}

  ngOnInit() {
    console.log('order-id: ' + this.common.currentOrderId);
    console.log('attachIcon: '+this.common.showAttachIcon);

    const $this = this;
    this.service = this.common.storage.getItem('serviceId');

    this.common.connectionEvents.on('text', function (data) {
        $this.addLocalMessage(data);
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
      for (let i = data.length - 1; i >= 0; i--){
        $this.addLocalMessage(data[i], 'up');
      }
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
    this.common.connectionEvents.removeAllListeners('updateText');
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

    (document.getElementById("user-message-input") as HTMLInputElement).value = '';
    this.scrollToBottom();
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

  addLocalMessage(data, position = 'down'){
    if (data.type === this.TYPE_SUBMIT) {
      console.log(data.content, data.content === undefined);
      if (data.content === undefined) {
        const url = 'getOrders&type=active&id=' + this.common.currentOrderId;
        this.common.get(url).subscribe(resp => {
          data.crm = resp.json()[1][0];
          console.log(data.crm);
        })
      }
    }
    if(position === 'down'){
      this.messages.push(data);
    }else{
      this.messages.unshift(data);
    }

    this.scrollToBottom();
  }

  goToGeoLocation() {
    this.router.navigate(['geolocation'])
  }

  goBack(){
    this.location.back();
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


  scrollToBottom(): void {
    if (!this._elementRef.nativeElement.querySelector('.all-messages')) {
      setTimeout(() => {
        this.scrollToBottom();
      }, 150)
    } else {
      let allMessages = this._elementRef.nativeElement.querySelector('.all-messages');
      allMessages.scrollTop = allMessages.scrollHeight;
      setTimeout(()=>{
        if (allMessages.scrollTop !== allMessages.scrollHeight) {
          allMessages.scrollTop = allMessages.scrollHeight;
        }
      }, 400);
    }
  }

  onMakeCall(){
    this.modal = true;
  }

  onCloseModal(event) {
    const modalWindow = document.getElementById('modal');
    const cancelCall = document.getElementById('cancel-call');
    if (event.target === modalWindow || event.currentTarget === cancelCall) {
      this.modal = false;
    }
  }

  onStartAudioCall(){
    this.modal = false;
    this.audioModal = true;
  }

  onCompleteAudioCall(){
    this.audioModal = false;
  }

  onStartVideoCall(){
    this.modal = false;
    this.videoModal = true;
  }

  onCompleteVideoCall(){
    this.videoModal = false;
  }
}
