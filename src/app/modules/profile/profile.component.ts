import {Component, OnInit} from '@angular/core';
import {ProfileService} from '../../services/profile.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  constructor(private router: Router,
              private profileService: ProfileService) { }

  ngOnInit() {
    this.authCheck();
  }

  /**
   * Quick authorization check
   */
  private authCheck() {
    this.profileService.userCreated = true;
    if (this.profileService.userCreated) {
      this.router.navigate(['']);
    }
  }
}
