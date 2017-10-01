import {Component, OnDestroy, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {CommonService} from '../../../services/common.service';
import {Subscription} from 'rxjs/Subscription';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit, OnDestroy {

  user;
  private subscriptions: Subscription[] = [];

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
      this.common.userCreated = false;
      this.router.navigate(['login']);
    }));
  }

  private getUser() {
    const url = 'getClientData';
    this.subscriptions.push(this.common.get(url).subscribe(resp => {
      console.log(resp.json());
      this.user = resp.json()[2];
    }));
  }
}
