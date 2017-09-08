import {Component, OnInit} from '@angular/core';
import {ProfileService} from '../../../services/profile.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  nameVal: string;
  passVal: string;

  constructor(private profileService: ProfileService,
              private router: Router) {
  }

  ngOnInit() {
    this.authCheck();
  }

  /**
   * Create pass
   */
  onPasswordCreate() {
    this.router.navigate(['password']);
  }

  /**
   * Quick authorization check
   */
  private authCheck() {
    // this.profileService.userCreated = true;
    if (this.profileService.userCreated) {
      this.router.navigate(['profile']);
    }
  }

}
