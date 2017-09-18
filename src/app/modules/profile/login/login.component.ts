import {Component, OnDestroy, OnInit} from '@angular/core';
import {ProfileService} from '../../../services/profile.service';
import {Router} from '@angular/router';
import {Subscription} from 'rxjs/Subscription';
import {Location} from '@angular/common';
import {CustomRequest} from '../../../services/request.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {

  phoneVal: string;
  passVal: string;

  private subscription: Subscription;

  constructor(private profileService: ProfileService,
              private requestService: CustomRequest,
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
    const url = 'https://usluga.namba1.co/api.php?todo=check_password_client' + phone + pass;
    this.subscription = this.requestService.get(url).subscribe(resp => {
      console.log(resp.json());
      const respStatus = resp.json()[0];
      if (respStatus === 'true') {
        this.router.navigate(['profile']);
      }
    });
  }

  /**
   * Quick authorization check
   */
  private authCheck() {
    if (this.profileService.userCreated) {
      this.router.navigate(['profile']);
    }
  }

}
