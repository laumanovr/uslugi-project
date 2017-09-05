import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {Location} from '@angular/common';
import {ProfileService} from '../../../services/profile.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private profileService: ProfileService,
              private location: Location,
              private router: Router) {
  }

  ngOnInit() {
  }

  /**
   * Handler for navigate back
   */
  onClickBack() {
    this.location.back();
  }

  onPasswordCreate() {
    this.router.navigate(['password']);
  }

}
