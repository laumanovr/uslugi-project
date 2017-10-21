import {Injectable} from '@angular/core';
import {Http, Headers, RequestOptions} from '@angular/http';
import {EventEmitter} from 'events';

@Injectable()
export class CommonService {

  fromOrderCreate = false;
  fromMasterPage = false;
  password = false;

  tempUser = {};

  /**
   * Local storage
   */
  storage = window.localStorage;

  /**
   * WebSocket connection with asterisk chats and video call service
   * @type {WebSocket}
   */
  connection: WebSocket;

  /**
   * WebSocket event emitter
   * @type {EventEmitter}
   */
  connectionEvents: EventEmitter = new EventEmitter;

  /**
   * WebSocket asterisk url
   * @type {string}
   */
  private connectionUrl = 'wss://pbx.minifets.info:9515/';

  /**
   * Maximum connection tries for creation
   * @type {number}
   */
  private tries = 5;

  /**
   * Main url to get and post data
   * @type {string}
   */
  private mainUrl = 'https://usluga.namba1.co/api.php?todo=';

  private header = new Headers({
    'Content-Type': 'application/x-www-form-urlencoded'
  });

  private options = new RequestOptions({
    headers: this.header,
  });


  constructor(private http: Http) {
    this.createConnection();
  }

  /**
   * Common functions to get and post data
   * @param {string} urlPart
   * @returns {Observable<Response>}
   */
  get(urlPart: string) {
    const url = this.mainUrl + urlPart;
    return this.http.get(url);
  }

  post(urlPart: string, body: string) {
    const url = this.mainUrl + urlPart;
    return this.http.post(url, body, this.options);
  }

  /**
   * Open new WebSocket connection
   * @param tries
   */
  createConnection(tries: number = 0) {
    const that = this;
    this.connection = new WebSocket(this.connectionUrl);
    this.connection.onopen = function () {
      console.log('Start new connection');
      tries = 0;
      if (that.storage.getItem('auth')) {
          console.log('Login in...');
          that.connection.send(JSON.stringify({
            action: 'login',
            data: JSON.parse(that.storage.getItem('asterisk'))
          }));
      }

    };
    this.connection.onerror = function (error) {
      console.log('Cannot connect to websocket', error);
    };
    this.connection.onclose = function () {
      console.log('Connection is closed, try to reconnect in 10 sec');
      if (tries < that.tries) {
        setTimeout(function () {
          that.createConnection(tries + 1);
        }, 10000);
      }
    };
    this.connection.onmessage = function (msg) {
      const data = JSON.parse(msg.data);

      if ('undefined' !== data.action) {
        that.connectionEvents.emit(data.action, data.data);
      }
    };
  }
}
