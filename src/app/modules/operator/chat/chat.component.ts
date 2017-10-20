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
     * @type {[{id: string; who: string; type: string; content: string; date: Date; sent: boolean; read: boolean}]}
     */
    messages = [
        {id: '123', who: this.CLIENT, type: 'text', content: 'Текст', date: new Date(), sent: true, read: true},
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
     * @param common
     */
    constructor(private common: CommonService) {
    }

    ngOnInit() {
        const master = this.common.storage.getItem('master');
        if (typeof master === 'string') {
            console.log(JSON.parse(master));
        }
        this.common.connectionEvents.on('text', function (data) {
            console.log(data.value);
        });
    }
}
