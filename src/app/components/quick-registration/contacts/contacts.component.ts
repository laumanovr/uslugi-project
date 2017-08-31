import {Component, OnInit} from '@angular/core';
import {Location} from '@angular/common';
import {Router} from '@angular/router';
import {ProfileService} from '../../../services/profile.service';

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.css']
})
export class ContactsComponent implements OnInit {

  emailValue: string;
  nameValue: string;
  phoneValue: string;
  descValue: string;

  constructor(private location: Location,
              private router: Router,
              private profileService: ProfileService) {
  }

  ngOnInit() {
  }

  /**
   * Handler for navigate back
   */
  onClickBack() {
    this.location.back();
  }

  onClick() {
    if (!this.emailValue) {
      this.emailValue = '';
    }
    this.profileService.user.name = this.nameValue;
    this.profileService.user.phone = this.phoneValue;
    this.profileService.user.email = this.emailValue;
    this.router.navigate(['quick-registration/code']);
  }
}
