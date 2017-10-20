import {Component, OnInit} from '@angular/core';
import RTCPeerConnection from 'webrtc-adapter';
import JsSIP from 'jssip';
import {CommonService} from '../../../services/common.service';

@Component({
    selector: 'app-chat',
    templateUrl: './chat.component.html',
    styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {

    private webSocketUrl = 'wss://localhost:9515/';

    /**
     * Project constants for user types (may be client or operator)
     */
    OPERATOR    = 'operator';
    CLIENT      = 'client';

    /**
     * Constants for user statuses
     */
    ONLINE      = 'Онлайн';
    OFFLINE     = 'Отсутствует';
    TYPING      = 'Печатает...';

    /**
     * @type {[{id: string; who: string; type: string; content: string; date: Date}]}
     */
    messages = [
        {id: 1, who: this.OPERATOR, type: 'image', content: '../../../assets/img/antenna.png', date: new Date('2017-10-09 10:15:00')},
        {id: 2, who: this.CLIENT, type: 'text', content: 'Текст', date: new Date()},
        {id: 3, who: this.CLIENT, type: 'desc', content: {
            desc: 'описание',
            address: 'ул. Медерова, 56',
            date: '03.08.2017',
            time: '10:00 - 12:00',
            price: '1500 сом'
        }, date: new Date()}
    ];

    /**
     * @type {string} Operator name
     */
    name    = '';

    /**
     * @type {string} Operator text statuses
     */
    status  = this.OFFLINE;

    /**
     * @type {WebSocket}
     */
    connection = null;

    /**
     * @type {number}
     */
    private connTries = 0;

    /**
     * @param common
     */
    constructor(private common: CommonService) {
    }

    ngOnInit() {
        this.createConnection();
    }

    createConnection() {
        const that = this;
        this.connection = new WebSocket(this.webSocketUrl);
        this.connection.onopen = function () {
            that.connTries = 0;
            console.log('Start new connection');
        };

        this.connection.onmessage = function (msg) {
            console.log(msg.data);
        };

        this.connection.onerror = function (error) {
            that.connTries += 1;
            if (that.connTries < 5) {
                that.createConnection();
            }

            console.log(error);
        };
    }
}
