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

  public mask = [[0], '(', /[0-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/];

  phoneVal: string;
  phoneComplete: boolean;
  private subscription: Subscription;

  constructor(private location: Location,
              private router: Router,
              private common: CommonService) {
  }

  ngOnInit() {
    this.checkPhone();
  }

  //check phone input to be completed
  checkPhoneComplete() {
    if (/[0-9]/.test(this.phoneVal[13])) {
      this.phoneComplete = false;
    } else {
      this.phoneComplete = true;
    }
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
    this.phoneVal = this.phoneVal.replace(/[- )(]/g, '');
    const url = 'sendSms&mobile=' + this.phoneVal;
    this.subscription = this.common.get(url).subscribe(resp => {
      if (resp.statusText === 'OK') {
        // Todo for test
        alert('смс код: ' + resp.json()[2]);
        const user = {phone: this.phoneVal};
        this.common.storage.setItem('user', JSON.stringify(user));
        this.router.navigate(['password-create']);
      }
    });
    console.log(this.phoneVal);
  }

  private checkPhone() {
    if (this.common.storage.getItem('user')) {
      const phone = JSON.parse(this.common.storage.getItem('user')).phone;
      if (phone) {
        this.phoneVal = 0 + phone;
      }
    }
  }
}
