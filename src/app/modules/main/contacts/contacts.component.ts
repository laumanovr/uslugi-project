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

  nameValue: string;
  phoneValue: string;
  phonePlaceholder = 'Номер телефона';
  modal = false;
  password = false;

  private button: HTMLElement;
  private subscriptions: Subscription[] = [];

  constructor(private location: Location,
              private router: Router,
              private common: CommonService) {
  }

  ngOnInit() {
    this.button = document.getElementById('btn');
    this.checkPhonePlaceholder();
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
    const user = {
      name: this.nameValue,
      phone: this.phoneValue
    };
    this.common.storage.setItem('user', JSON.stringify(user));
    if (this.common.storage.getItem('auth')) {
      this.router.navigate(['choose']);
    } else {
      this.createUser();
    }
  }

  /**
   * Handler to change the button colors
   */
  checkBtnValid() {
    const buttonDisabled = (<HTMLInputElement> document.getElementById('btn')).disabled;
    if (buttonDisabled === false) {
      this.button.style.backgroundColor = '#FFC107';
      this.button.style.color = 'black';
    } else {
      this.button.style.backgroundColor = '#E5E5E5';
    }
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
    if (this.common.storage.getItem('auth')) {
      this.phonePlaceholder = 'Контактный телефон';
      this.phoneValue = '0' +  JSON.parse(this.common.storage.getItem('user')).phone;
      this.nameValue = JSON.parse(this.common.storage.getItem('user')).name;
    }
  }
}
