import {Component, OnDestroy, OnInit} from '@angular/core';
import {Location} from '@angular/common';
import {Router} from '@angular/router';
import {Subscription} from 'rxjs/Subscription';
import {CustomRequest} from '../../../services/request.service';
import {ProfileService} from '../../../services/profile.service';
import {MasterService} from '../../../services/master.service';

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.css']
})
export class ContactsComponent implements OnInit, OnDestroy {

  nameValue: string;
  phoneValue: string;
  notif: string;
  phonePlaceholder = 'Номер телефона';

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
    this.master.currentPhone = this.phoneValue;
    if (this.profile.userCreated) {
      this.router.navigate(['choose']);
    } else {
      this.createUser();
    }
  }

  phoneValid() {
    if (!this.phoneValue) {
      this.notif = '';
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

  private createUser() {
    const urlPart = 'https://usluga.namba1.co/api.php?todo=create_client';
    const name = '&firstname=' + this.nameValue;
    const phone = '&mobile=' + this.phoneValue;
    const url = urlPart + phone + name;
    this.subscriptions.push(
      this.request.get(url).subscribe(resp => {
        console.log(resp.json());
        const userCreated = resp.json()[0];
        if (userCreated === 'ok') {
          this.sendSms();
        } else if (userCreated === 'error') {
          this.notif = resp.json()[1];
        }
      }));
  }

  private sendSms() {
    const urlSms = 'https://usluga.namba1.co/api.php?todo=sendSms&mobile=' + this.phoneValue;
    this.subscriptions.push(this.request.get(urlSms).subscribe(resp => {
      if (resp.statusText === 'OK') {
        this.router.navigate(['sms-code']);
      }
    }));
  }

  private checkPhonePlaceholder() {
    if (this.profile.userCreated) {
      this.phonePlaceholder = 'Контактный телефон';
    }
  }
}
