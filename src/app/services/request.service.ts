import {Injectable} from '@angular/core';
import {Http, Headers, RequestOptions} from '@angular/http';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class CustomRequest {

  private header = new Headers({});

  // Options for request
  private options = new RequestOptions({
    headers: this.header,
  });

  constructor(private http: Http) {
  }

  get(url: string) {
    return this.http.get(url);
  }

  post(url: string, body: any): Observable<any> {
    return this.http.post(url, body);
  }

}
