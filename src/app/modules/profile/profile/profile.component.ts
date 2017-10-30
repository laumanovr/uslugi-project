import {Component, OnDestroy, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {CommonService} from '../../../services/common.service';
import {Subscription} from 'rxjs/Subscription';
import {User} from '../../../models/user';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit, OnDestroy {

  user: User;
  private subscriptions: Subscription[] = [];
  is_loading = true;

  constructor(private router: Router,
              private common: CommonService) {
  }

  ngOnInit() {
    this.getUser();
  }

  ngOnDestroy() {
    while (this.subscriptions.length) {
      this.subscriptions.pop().unsubscribe();
    }
  }

  onClickCreatePass() {
    this.router.navigate(['password']);
  }

  onClickQuite() {
    const url = 'deleteSession';
    this.subscriptions.push(this.common.get(url).subscribe(resp => {
      this.common.storage.setItem('auth', 'false');
      this.common.storage.removeItem('user');
      this.router.navigate(['login']);
    }));
  }

  private getUser() {
    const url = 'getClientData';
    this.subscriptions.push(this.common.get(url).subscribe(resp => {
      this.user = resp.json()[2];
      this.is_loading = false;
    }));
  }
}
