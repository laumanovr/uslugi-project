import {Component, OnDestroy, OnInit} from '@angular/core';
import {Location} from '@angular/common';
import {Router} from '@angular/router';
import {CustomRequest} from '../../../services/request.service';
import {Subscription} from 'rxjs/Subscription';
import {ProfileService} from '../../../services/profile.service';

@Component({
  selector: 'app-password',
  templateUrl: './password.component.html',
  styleUrls: ['./password.component.scss']
})
export class PasswordComponent implements OnInit, OnDestroy {

  phoneVal: string;
  private subscription: Subscription;

  constructor(private location: Location,
              private router: Router,
              private request: CustomRequest,
              private profileService: ProfileService) {
  }

  ngOnInit() {
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  onClickBack() {
    this.location.back();
  }

  onSendSms() {
    const url = 'https://usluga.namba1.co/api.php?todo=sendSms&mobile=' + this.phoneVal;
    this.subscription = this.request.get(url).subscribe(resp => {
      console.log(resp.json());
      if (resp.statusText === 'OK') {
        this.profileService.phone = this.phoneVal;
        this.router.navigate(['password-create']);
      }
    });
  }
}
