import {Component, OnDestroy, OnInit} from '@angular/core';
import {Location} from '@angular/common';
import {Router} from '@angular/router';
import {ProfileService} from '../../../services/profile.service';
import {RequestService} from '../../../services/request.service';
import {Subscription} from 'rxjs/Subscription';

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.css']
})
export class ContactsComponent implements OnInit, OnDestroy {

  emailValue: string;
  nameValue: string;
  phoneValue: string;

  private button: HTMLElement;
  private subscriptions: Subscription[] = [];

  constructor(private location: Location,
              private router: Router,
              private profileService: ProfileService,
              private request: RequestService) {
  }

  ngOnInit() {
    this.button = document.getElementById('btn');
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

  onClick() {
    if (!this.emailValue) {
      this.emailValue = '';
    }
    const urlPart = 'https://usluga.namba1.co/api.php?todo=create_client';
    const name = '&firstname=' + this.nameValue;
    const phone = '&mobile=' + this.phoneValue;
    const url = urlPart + name + phone;
    this.subscriptions.push(
      this.request.get(url).subscribe(data => {
        console.log(data);
        const urlSms = 'http://namba.usta.asia/api.php?todo=sendSms&mobile=' + this.phoneValue;
        this.request.get(urlSms).subscribe(data2 => {
          console.log(data2.json());
          // const xmlData = data2._body;
          // const parser = new DOMParser();
          // const xmlDoc = parser.parseFromString(xmlData, 'text/xml');
          // alert(xmlDoc.getElementsByTagName('text')[0].childNodes[0].nodeValue);
          if (data2.statusText === 'OK') {
            this.router.navigate(['sms-code']);
          }
        });
      }));
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
