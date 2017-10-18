import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from 'rxjs/Subscription';
import {CommonService} from './services/common.service';

@Component({
  selector: 'app-root',
  template: `
    <router-outlet></router-outlet>`
})
export class AppComponent implements OnInit, OnDestroy {

  private subscription: Subscription;

  constructor(private common: CommonService) {
  }

  ngOnInit() {
    this.getUserFromApi();
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  private getUserFromApi() {
    this.subscription = this.common.get('getClientData')
      .subscribe(resp => {
        const user = {
          name: resp.json()[2].name,
          phone: resp.json()[2].phone
        };
        const userAuth = resp.json()[2].name;
        if (userAuth !== '' && userAuth !== 'undefined') {
          this.common.storage.setItem('auth', 'true');
          this.common.storage.setItem('user', JSON.stringify(user));
        }
      });
  }

}
