import {Component, OnInit} from '@angular/core';

@Component({
    selector: 'app-chat',
    templateUrl: './chat.component.html',
    styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {

    OPERATOR = 'operator';
    CLIENT = 'client';

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

    name = 'Виктория';

    status = 'Онлайн';

    constructor() {
    }

    ngOnInit() {
    }

    newChat() {
        console.log('Hear');
    }
}
