import {Injectable} from '@angular/core';
import {Http, Headers, RequestOptions} from '@angular/http';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class RequestService {

  private header = new Headers({
  });

  // Options for request
  private options = new RequestOptions({
    headers: this.header,
  });

  constructor(private http: Http) {
  }

  get(url: string): Observable<any> {
    return this.http.get(url);
  }

}
