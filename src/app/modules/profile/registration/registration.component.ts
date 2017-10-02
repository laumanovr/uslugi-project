import {Component, OnDestroy, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {Location} from '@angular/common';
import {Subscription} from 'rxjs/Subscription';
import {CommonService} from '../../../services/common.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit, OnDestroy {

  codeValue: string;
  nameValue: string;
  phoneValue: string;
  passValue: string;
  modal = false;
  password = false;
  phoneBusy = false;
  countdown = 13;
  nullDigit: number;
  smsRepeat = false;

  private button: HTMLElement;
  private checkBox = true;
  private subscriptions: Subscription[] = [];

  constructor(private router: Router,
              private location: Location,
              private common: CommonService) {
  }

  ngOnInit() {
    (<HTMLInputElement>document.getElementById('checkBox')).checked = true;
  }

  ngOnDestroy() {
    while (this.subscriptions.length) {
      this.subscriptions.pop().unsubscribe();
    }
  }

  checkPhone() {
    const url = 'check_number&mobile=' + this.phoneValue;
    this.subscriptions.push(this.common.get(url).subscribe(data => {
      const resp = data.json()[1];
      console.log(resp);
      if (resp === 'number exist') {
        return this.phoneBusy = true;
      }
      return this.phoneBusy = false;
    }));
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
    this.modal = true;
    this.smsSend();
    this.countDownStart();
  }

  onNext() {
    const url = 'checkSms&code=' + this.codeValue + '&mobile=' + this.phoneValue;
    this.subscriptions.push(this.common.get(url).subscribe(data => {
      if (data.statusText === 'OK') {
        this.createUser();
      }
    }));
  }

  /**
   * When the user clicks anywhere outside of the modal, close it
   * @param event
   */
  onClickOverModal(event) {
    const modalWindow = document.getElementById('modal');
    if (event.target === modalWindow) {
      this.modal = false;
    }
  }

  private countDownStart() {
    const second = 1;
    const timer = setInterval(() => {
      this.countdown -= second;
      if (this.countdown < 10) {
        this.nullDigit = 0;
        if (this.countdown <= 0) {
          this.smsRepeat = true;
          clearInterval(timer);
        }
      }
    }, 1000);
  }

  private createUser() {
    const urlPart = 'create_client';
    const name = '&firstname=' + this.nameValue;
    const phone = '&mobile=' + this.phoneValue;
    const url = urlPart + phone + name;
    this.subscriptions.push(
      this.common.get(url).subscribe(data => {
        const resp = data.json()[0];
        if (resp === 'ok') {
          this.common.userCreated = true;
          this.router.navigate(['profile']);
        }
      }));
  }

  private smsSend() {
    const urlSms = 'sendSms&mobile=' + this.phoneValue;
    this.subscriptions.push(this.common.get(urlSms).subscribe(resp => {
      if (resp.statusText === 'OK') {
        // Todo for test
        alert('Ваш смс код: ' + resp.json()[2]);
      }
    }));
  }

}
