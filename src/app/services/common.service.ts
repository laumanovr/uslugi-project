import {Injectable} from '@angular/core';
import {Http, Headers, RequestOptions} from '@angular/http';
import {EventEmitter} from 'events';

@Injectable()
export class CommonService {

  geoAddress: string;

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
   * Logged in web socket
   * @type {boolean}
   */
  logged = false;

  /**
   * WebSocket asterisk url
   * @type {string}
   */
  private connectionUrl = 'ws://127.0.0.1:9515/';

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

  /**
   * @param {Http} http
   */
  constructor(private http: Http) {
    const that = this;
    this.connectionEvents.on('registered', function (data) {
      that.storage.setItem('asterisk', JSON.stringify(data));
    });
    this.connectionEvents.on('logged', function (data) {
      that.logged = true;
      console.log('Successfully logged');
    });
    this.connectionEvents.on('error', function (data) {
      console.log(data);
    });
    // Connect to web socket
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
      if (!that.storage.getItem('auth')) {
        return null;
      }
      // After connection is established login or register user
      if (null === that.storage.getItem('asterisk')) {
        console.log('Register new account');
        that.connection.send(JSON.stringify({
          action: 'register',
          params: JSON.parse(that.storage.getItem('user'))
        }));
      } else {
        console.log('Login in...');
        that.connection.send(JSON.stringify({
          action: 'login',
          params: JSON.parse(that.storage.getItem('asterisk'))
        }));
      }
    };

    this.connection.onerror = function (error) {
      console.log('Cannot connect to websocket', error);
    };

    this.connection.onclose = function () {
      console.log('Connection is closed, try to reconnect in 10 sec');
      if (tries < 5) {
        setTimeout(function () {
          that.createConnection(tries + 1);
        }, 10000);
      }
    };

    this.connection.onmessage = function (msg) {
      const data = JSON.parse(msg.data);

      if ('undefined' !== data.action) {
        that.connectionEvents.emit(data.action, data.params);
      }
    };
  }
}
