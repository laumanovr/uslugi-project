import {Component, OnDestroy, OnInit} from '@angular/core';
import {Location} from '@angular/common';
import {Router} from '@angular/router';
import {Subscription} from 'rxjs/Subscription';
import {CommonService} from '../../../services/common.service';

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
              private common: CommonService) {
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
    const url = 'sendSms&mobile=' + this.phoneVal;
    this.subscription = this.common.get(url).subscribe(resp => {
      if (resp.statusText === 'OK') {
        // Todo for test
        alert('смс код: ' + resp.json()[2]);
        this.common.phone = this.phoneVal;
        this.router.navigate(['password-create']);
      }
    });
  }
}
