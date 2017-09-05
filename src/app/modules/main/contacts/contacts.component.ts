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

  button: HTMLElement;
  emailValue: string;
  nameValue: string;
  phoneValue: string;

  constructor(private location: Location,
              private router: Router,
              private profileService: ProfileService) {
  }

  ngOnInit() {
    this.button = document.getElementById('btn');
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
    this.profileService.name = this.nameValue;
    this.profileService.phone = this.phoneValue;
    this.profileService.email = this.emailValue;
    this.router.navigate(['sms-code']);
  }

  /**
   * Handler to change the button colors
   */
  checkBtnValid() {
    const buttonDisabled = (<HTMLInputElement> document.getElementById('btn')).disabled;
    if (buttonDisabled === false) {
      this.button.style.backgroundColor = '#FFC107';
    } else {
      this.button.style.backgroundColor = '#E5E5E5';
    }
  }
}
