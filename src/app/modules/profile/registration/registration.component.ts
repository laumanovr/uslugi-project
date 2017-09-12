import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {Location} from '@angular/common';
import {Subscription} from 'rxjs/Subscription';
import {RequestService} from '../../../services/request.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {

  emailValue: string;
  nameValue: string;
  phoneValue: string;
  passValue: string;

  private button: HTMLElement;
  private subscription: Subscription;

  constructor(private router: Router,
              private location: Location,
              private requestService: RequestService) {
  }

  ngOnInit() {
  }

  /**
   * Handler for navigate back
   */
  onClickBack() {
    this.location.back();
  }

  /**
   * Handler to change the button colors
   */
  checkFormValid() {
    // const buttonDisabled = (<HTMLInputElement> document.getElementById('btn')).disabled;
    // if (buttonDisabled === false) {
    //   this.button.style.backgroundColor = '#FFC107';
    // } else {
    //   this.button.style.backgroundColor = '#E5E5E5';
    // }
  }

  onClickRegBTn() {
    this.sendUserToApi();
  }

  private sendUserToApi() {
    const urlPart = 'http://namba.usta.asia/api.php?todo=create_client';
    const name = '&firstname=' + this.nameValue;
    const phone = '&mobile=' + this.phoneValue;
    const pass = '&password=' + this.passValue;
    const url = urlPart + name + phone + pass;
    this.subscription = this.requestService.get(url).subscribe(resp => {
      console.log(resp.json());
      console.log(document.cookie);
    });
  }

}
