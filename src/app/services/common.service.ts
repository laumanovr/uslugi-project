import {Injectable} from '@angular/core';
import {Http, Headers, RequestOptions} from '@angular/http';

@Injectable()
export class CommonService {

  name: string;
  phone: string;
  userAuth= false;
  fromOrderCreate = false;
  fromMasterPage = false;
  password = false;
  selectedService: string;
  selectedMaster;
  orderPhone: string;
  orderName: string;

  /**
   * Local storage
   */
  storage = window.localStorage;

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

}
