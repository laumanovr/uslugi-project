import {Component, OnDestroy, OnInit} from '@angular/core';
import {Location} from '@angular/common';
import {Router} from '@angular/router';
import {Subscription} from 'rxjs/Subscription';
import {CustomRequest} from '../../../services/request.service';
import {ProfileService} from '../../../services/profile.service';
import {MasterService} from '../../../services/master.service';
import {Observable} from 'rxjs/Observable';

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
              private profile: ProfileService,
              private request: CustomRequest,
              private master: MasterService) {
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
    this.master.orderPhone = this.phoneValue;
    this.master.orderName = this.nameValue;
    this.profile.phone = this.phoneValue;
    if (this.profile.userCreated) {
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
    this.profile.fromOrderCreate = true;
    this.router.navigate(['login']);
  }

  onPassCreate() {
    this.profile.fromOrderCreate = true;
    this.sendSms('create pass');
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
            this.sendSms('default');
            break;
        }
      }));
  }

  private sendSms(route) {
    const urlSms = 'https://usluga.namba1.co/api.php?todo=sendSms&mobile=' + this.phoneValue;
    this.subscriptions.push(this.request.get(urlSms).subscribe(resp => {
      console.log(resp.json());
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
    if (this.profile.userCreated) {
      this.phonePlaceholder = 'Контактный телефон';
      this.phoneValue = this.profile.phone;
      this.nameValue = this.profile.name;
    }
  }
}
