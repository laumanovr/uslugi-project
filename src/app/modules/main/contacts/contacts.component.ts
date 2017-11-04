import {Component, OnDestroy, OnInit} from '@angular/core';
import {Location} from '@angular/common';
import {Router} from '@angular/router';
import {Subscription} from 'rxjs/Subscription';
import {CommonService} from '../../../services/common.service';

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.css']
})
export class ContactsComponent implements OnInit, OnDestroy {

  public mask = [[0], '(', /[0-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/];

  nameValue: string;
  phoneValue: string;
  phonePlaceholder = 'Номер телефона';
  modal = false;
  password = false;
  phoneComplete: boolean;

  private button: HTMLElement;
  private subscriptions: Subscription[] = [];

  constructor(private location: Location,
              private router: Router,
              private common: CommonService) {
  }

  ngOnInit() {
    this.button = document.getElementById('btn');
    this.checkPhonePlaceholder();
    if(this.common.storage.getItem('user') && JSON.parse(this.common.storage.getItem('user')).name
      && JSON.parse(this.common.storage.getItem('user')).phone) {
      this.button.style.backgroundColor = '#FFC107';
      this.button.style.color = 'black';
    }
  }

  /**
   * check phone input to be completed
   */
  checkPhoneComplete() {
    this.button.style.backgroundColor = '#E5E5E5';
    this.phoneComplete = true;
    if (/[0-9]/.test(this.phoneValue[13])) {
      this.phoneComplete = false;
      this.button.style.backgroundColor = '#FFC107';
      this.button.style.color = 'black';
    }
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

  onNext() {
    this.phoneValue = this.phoneValue.replace(/[- )(]/g, '');
    this.common.storage.setItem('orderPhone', this.phoneValue);
    this.common.tempUser = {
      name: this.nameValue,
      phone: this.phoneValue
    };
    if (JSON.parse(this.common.storage.getItem('auth'))) {
      this.router.navigate(['choose']);
    } else {
      this.createUser();
    }
    this.common.recoveryPhoneVal = this.phoneValue;
  }


  onLogin() {
    this.common.fromOrderCreate = true;
    this.router.navigate(['login']);
  }

  onPassCreate() {
    this.common.fromOrderCreate = true;
    this.sendSms('create pass');
  }

  onClickOverModal(event) {
    const modalWindow = document.getElementById('modal');
    if (event.target === modalWindow) {
      this.modal = false;
    }
  }

  private createUser() {
    const urlPart = 'create_client';
    const name = '&firstname=' + this.nameValue;
    const phone = '&mobile=' + this.phoneValue;
    const url = urlPart + phone + name;
    this.subscriptions.push(
      this.common.get(url).subscribe(resp => {
        console.log(resp);
        const userCreated = resp.json()[1];
        switch (userCreated) {
          case 'no password':
            this.modal = true;
            break;
          case 'number is registered':
            this.password = true;
            this.modal = true;
            break;
          case 'client':
            this.sendSms('default');
            break;
        }
      }));
  }

  private sendSms(route) {
    const urlSms = 'sendSms&mobile=' + this.phoneValue;
    this.subscriptions.push(this.common.get(urlSms).subscribe(resp => {
      console.log(resp);
      alert('Ваш смс код: ' + resp.json()[2]);
      if (resp.statusText === 'OK') {
        switch (route) {
          case 'default':
            this.router.navigate(['sms-code']);
            break;
          case 'create pass':
            this.router.navigate(['password-create']);
            break;
        }
      }
    }));
  }

  private checkPhonePlaceholder() {
    if (this.common.storage.getItem('user')) {
      this.phonePlaceholder = 'Контактный телефон';
      this.phoneValue = JSON.parse(this.common.storage.getItem('user')).phone;
      this.nameValue = JSON.parse(this.common.storage.getItem('user')).name;
    }
  }

}
