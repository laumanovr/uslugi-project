import {Component, OnDestroy, OnInit} from '@angular/core';
import RTCPeerConnection from 'webrtc-adapter';
import JsSIP from 'jssip';
import {CommonService} from '../../../services/common.service';

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
    {id: '123', who: this.CLIENT, type: 'text', content: 'Текст', date: new Date(), sent: true, read: true},
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
  constructor(private common: CommonService) {
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
    this.common.connectionEvents.on('logged', function () {
      console.log('Try init chat');
      that.common.connection.send(JSON.stringify({
        action: 'initChat',
        data: {
          context: that.service
        }
      }));
    });
  }

  ngOnDestroy() {
    this.common.connectionEvents.removeAllListeners();
  }

  sendMessage(text: string) {
    this.common.connection.send(JSON.stringify({
      action: 'text',
      data: {
        id: this.id,
        context: this.service,
        content: text
      }
    }));
  }
}
