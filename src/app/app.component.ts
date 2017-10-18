import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from 'rxjs/Subscription';
import {CommonService} from './services/common.service';

@Component({
  selector: 'app-root',
  template: `<router-outlet></router-outlet>`
})
export class AppComponent implements OnInit, OnDestroy {

  private subscription: Subscription;

  constructor(private common: CommonService) {
  }

  ngOnInit() {
    this.subscription = this.common.get('getClientData')
      .subscribe(resp => {
        const user = resp.json()[2];
        const userAuth = resp.json()[2].name;
        if (userAuth !== '' && userAuth !== 'undefined') {
          this.common.userAuth = true;
          this.common.phone = '0' + user.phone;
          this.common.name = user.name;
        }
      });
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

}
