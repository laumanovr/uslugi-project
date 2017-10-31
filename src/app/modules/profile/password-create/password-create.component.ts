import {Component, OnDestroy, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {Location} from '@angular/common';
import {Subscription} from 'rxjs/Subscription';
import {CommonService} from '../../../services/common.service';

@Component({
  selector: 'app-password-create',
  templateUrl: './password-create.component.html',
  styleUrls: ['./password-create.component.scss']
})
export class PasswordCreateComponent implements OnInit, OnDestroy {

  codeValue: string;
  passValue: string;
  subscription: Subscription;
  countdown = 10;
  nullDigit: number;
  smsRepeat = true;

  constructor(private location: Location,
              private router: Router,
              private common: CommonService) {
  }

  ngOnInit() {
    console.log('----Phone-Recovery: '+this.common.recoveryPhoneVal);
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  onClickBack() {
    this.location.back();
  }

  onSave() {
    const urlPart = 'updatePasswordBySms&code=';
    const url = urlPart + this.codeValue + '&mobile=' + this.common.recoveryPhoneVal
      + '&password=' + this.passValue;
    this.subscription = this.common.get(url).subscribe(data => {
      console.log(data.json());
      const response = data.json()[0];
      if (response === 'ok') {
        this.common.storage.setItem('auth', 'true');
        this.checkRoutes();
      }
    });
  }

  private checkRoutes() {
    if (this.common.fromOrderCreate) {
      this.common.storage.setItem('auth', 'true');
      this.router.navigate(['choose']);
    }
    this.router.navigate(['profile']);
  }

  onSendSmsAgain() {
    const url = 'sendSms&mobile=' + this.common.recoveryPhoneVal;
    this.subscription = this.common.get(url).subscribe(resp => {
      if (resp.statusText === 'OK') {
        // Todo for test
        alert('смс код: ' + resp.json()[2]);
        const user = {phone: this.common.recoveryPhoneVal};
        this.common.storage.setItem('user', JSON.stringify(user));
        console.log(resp);
      }
    });

    this.countDownStart();
  }

  private countDownStart() {
    this.countdown = 10;
    this.smsRepeat = false;
    const second = 1;
    const timer = setInterval(() => {
      this.countdown -= second;
      if (this.countdown < 10) {
        this.nullDigit = 0;
        if (this.countdown <= 0) {
          this.smsRepeat = true;
          clearInterval(timer);
        }
      }
    }, 1000);
  }

}
