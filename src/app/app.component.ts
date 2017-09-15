import {Component, OnDestroy, OnInit} from '@angular/core';
import {CustomRequest} from './services/request.service';
import {Subscription} from 'rxjs/Subscription';
import {ProfileService} from './services/profile.service';

@Component({
  selector: 'app-root',
  template: `
    <router-outlet></router-outlet>`
})
export class AppComponent implements OnInit, OnDestroy {

  private subscription: Subscription;

  constructor(private request: CustomRequest,
              private profile: ProfileService) {
  }

  ngOnInit() {
    this.subscription = this.request.get('https://usluga.namba1.co/api.php?todo=getClientData')
      .subscribe(resp => {
        console.log(resp.json());
        const userAuth = resp.json()[2].name;
        if (userAuth !== '' && userAuth !== 'undefined') {
          this.profile.userCreated = true;
        }
      });
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

}
