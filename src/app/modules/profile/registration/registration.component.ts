import {Component, OnDestroy, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {Location} from '@angular/common';
import {Subscription} from 'rxjs/Subscription';
import {CustomRequest} from '../../../services/request.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit, OnDestroy {

  codeValue: string;
  emailValue: string;
  nameValue: string;
  phoneValue: string;
  passValue: string;
  modal = false;
  password = false;
  phoneBusy = false;

  private button: HTMLElement;
  private checkBox = true;
  private subscriptions: Subscription[] = [];

  constructor(private router: Router,
              private location: Location,
              private request: CustomRequest) {
  }

  ngOnInit() {
    (<HTMLInputElement>document.getElementById('checkBox')).checked = true;
  }

  ngOnDestroy() {
    while (this.subscriptions.length) {
      this.subscriptions.pop().unsubscribe();
    }
  }

  /**
   * Handler for navigate back
   */
  onClickBack() {
    this.location.back();
  }

  onCheckBox() {
    const checkBox = (<HTMLInputElement>document.getElementById('checkBox')).checked;
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
    this.sendSms();
  }

  checkPhone() {
    console.log('Checking');
  }

  private sendSms() {
    const urlSms = 'https://usluga.namba1.co/api.php?todo=sendSms&mobile=' + this.phoneValue;
    this.subscriptions.push(this.request.get(urlSms).subscribe(resp => {
      console.log(resp.json());
      if (resp.statusText === 'OK') {
        this.createUser();
      }
    }));
  }

  private createUser() {
    const urlPart = 'https://usluga.namba1.co/api.php?todo=create_client';
    const name = '&firstname=' + this.nameValue;
    const phone = '&mobile=' + this.phoneValue;
    const url = urlPart + phone + name;
    this.subscriptions.push(
      this.request.get(url).subscribe(resp => {
        const userCreated = resp.json()[1];
        switch (userCreated) {
          case 'no password':
            this.modal = true;
            break;
          case 'number is registered':
            this.password = true;
            this.modal = true;
            break;
          case 'ok':
            break;
        }
      }));
  }

}
