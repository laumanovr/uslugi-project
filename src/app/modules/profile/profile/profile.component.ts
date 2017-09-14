import {Component, OnDestroy, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {Location} from '@angular/common';
import {ProfileService} from '../../../services/profile.service';
import {Subscription} from 'rxjs/Subscription';
import {RequestService} from '../../../services/request.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit, OnDestroy {

  user;
  private subscriptions: Subscription[] = [];

  constructor(private router: Router,
              private location: Location,
              private requestService: RequestService,
              private profileService: ProfileService) {
  }

  ngOnInit() {
    this.getDataFromApi();
  }

  ngOnDestroy() {
    while (this.subscriptions.length) {
      this.subscriptions.pop().unsubscribe();
    }
  }

  /**
   * Handler for navigate back
   */
  onClickBack() {
    this.location.back();
  }

  onClickCreatePass() {
    this.router.navigate(['password-create']);
  }

  onClickQuite() {
    const url = 'https://usluga.namba1.co/api.php?todo=deleteSession';
    this.subscriptions.push(this.requestService.get(url).subscribe(resp => {
      location.reload();
    }));
  }

  private getDataFromApi() {
    const url = 'https://usluga.namba1.co/api.php?todo=getClientData';
    this.subscriptions.push(this.requestService.get(url).subscribe(resp => {
      console.log(resp);
      this.user = resp.json()[2];
    }));
  }
}
