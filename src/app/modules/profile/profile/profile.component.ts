import {Component, OnDestroy, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {ProfileService} from '../../../services/profile.service';
import {Subscription} from 'rxjs/Subscription';
import {CustomRequest} from '../../../services/request.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit, OnDestroy {

  user;
  private subscriptions: Subscription[] = [];

  constructor(private router: Router,
              private requestService: CustomRequest,
              private profile: ProfileService) {
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
    const url = 'https://usluga.namba1.co/api.php?todo=deleteSession';
    this.subscriptions.push(this.requestService.get(url).subscribe(resp => {
      this.profile.userCreated = false;
      this.router.navigate(['login']);
    }));
  }

  private getUser() {
    const url = 'https://usluga.namba1.co/api.php?todo=getClientData';
    this.subscriptions.push(this.requestService.get(url).subscribe(resp => {
      console.log(resp);
      this.user = resp.json()[2];
    }));
  }
}
