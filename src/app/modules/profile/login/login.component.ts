import {Component, OnDestroy, OnInit} from '@angular/core';
import {CommonService} from '../../../services/common.service';
import {Router} from '@angular/router';
import {Subscription} from 'rxjs/Subscription';
import {Location} from '@angular/common';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {

  public mask = [[0], '(', /[0-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/];

  phoneVal: string;
  passVal: string;
  phoneComplete: boolean;


  private subscription: Subscription;

  constructor(private common: CommonService,
              private location: Location,
              private router: Router) {
  }

  ngOnInit() {
    this.authCheck();
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

  /**
   * Handler for navigate back
   */
  onClickBack() {
    this.location.back();
  }

  /**
   * Create pass
   */
  onPasswordCreate() {
    this.router.navigate(['password']);
  }

  /**
   * Navigate to registration page
   */
  onRegistration() {
    this.router.navigate(['registration']);
  }

  /**
   * User checking
   */
  onLogin() {
    this.phoneVal = this.phoneVal.replace(/[- )(]/g, '');
    const phone = '&mobile=' + this.phoneVal;
    const pass = '&password=' + this.passVal;
    const url = 'check_password_client' + phone + pass;
    this.subscription = this.common.get(url).subscribe(resp => {
      console.log(resp);
      const respStatus = resp.json()[0];
      const user = {
        name: resp.json()[2].name,
        phone: 0 + resp.json()[2].phone
      };
      if (respStatus === 'ok') {
        this.common.storage.setItem('auth', 'true');
        this.common.storage.setItem('user', JSON.stringify(user));
        this.checkRoutes();
      }
    });
    console.log(this.phoneVal);
  }

  /**
   * Quick authorization check
   */
  private authCheck() {
    const auth = Boolean(this.common.storage.getItem('auth'));
    if (auth) {
      this.router.navigate(['profile']);
    }
  }

  private checkRoutes() {
    if (this.common.fromOrderCreate) {
      this.router.navigate(['choose']);
    } else {
      this.router.navigate(['profile']);
    }
  }
}
