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
   * @type {[{id: string; who: string; type: string; content: string; date: Date; sent: boolean; read: boolean}]}
   */
  messages = [
    {id: '123', who: this.CLIENT, type: 'text', content: 'Текст клиента', date: new Date(), sent: true, read: true},
    {id: '5', who: this.OPERATOR, type: 'text', content: 'Текст оператора', date: new Date(), sent: true, read: true}
  ];

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
   * Chat id
   * @type {number}
   */
  id = null;

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
    this.common.connectionEvents.on('chatInited', function (data) {
      that.id = data.id;
    });
    this.common.connectionEvents.on('text', function (data) {
      that.messages.push(data);
    });
    this.common.connectionEvents.on('error', function (data) {
      console.log(data);
    });
    this.common.connectionEvents.on('logged', function () {
      console.log('Try init chat');
      that.common.connection.send(JSON.stringify({
        action: 'initChat',
        data: {
          context: that.service
        }
      }));
    });
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
        })
      };
      reader.readAsDataURL(event.target.files[0]);
    }
  }

  sendMessage() {
    console.log(this.usersMessage);
    this.common.connection.send(JSON.stringify({
      action: 'text',
      data: {
        id: this.id,
        context: this.service,
        content: this.usersMessage
      }
    }));
  }

  goToGeoLocation() {
    this.router.navigate(['geolocation'])
  }

  hideDropUpMenu() {
    let dropUp = <HTMLElement>document.getElementsByClassName('drop-up')[0];
    dropUp.style.display = 'none';
  }

  toggleDropUp() {
    let dropUp = <HTMLElement>document.getElementsByClassName('drop-up')[0];
    if (dropUp.style.display === 'none') {
      dropUp.style.display = 'block';
    } else {
      dropUp.style.display = 'none';
    }
  }
}
