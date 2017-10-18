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

  phoneVal: string;
  passVal: string;

  private subscription: Subscription;

  constructor(private common: CommonService,
              private location: Location,
              private router: Router) {
  }

  ngOnInit() {
    this.authCheck();
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
    const phone = '&mobile=' + this.phoneVal;
    const pass = '&password=' + this.passVal;
    const url = 'check_password_client' + phone + pass;
    this.subscription = this.common.get(url).subscribe(resp => {
      const respStatus = resp.json()[0];
      if (respStatus === 'ok') {
        this.common.storage.setItem('auth', 'true');
        this.checkRoutes();
      }
    });
  }

  /**
   * Quick authorization check
   */
  private authCheck() {
    console.log(this.common.storage.getItem('auth'));
    if (this.common.storage.getItem('auth')) {
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
