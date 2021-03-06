import {Component, OnDestroy, OnInit} from '@angular/core';
import {Location} from '@angular/common';
import {Router} from '@angular/router';
import {Subscription} from 'rxjs/Subscription';
import {CommonService} from '../../../services/common.service';

@Component({
  selector: 'app-code',
  templateUrl: './code.component.html',
  styleUrls: ['./code.component.css']
})
export class CodeComponent implements OnInit, OnDestroy {

  codeValue: string;
  private subscriptions: Subscription[] = [];

  constructor(private location: Location,
              private router: Router,
              private common: CommonService) {
  }

  ngOnInit() {
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
    const phone = this.common.recoveryPhoneVal;
    const url = 'checkSms&code=' + this.codeValue + '&mobile=' + phone;
    this.subscriptions.push(this.common.get(url).subscribe(data => {
      if (data.statusText === 'OK') {
        this.common.storage.setItem('auth', 'true');
        this.common.storage.setItem('user', JSON.stringify(this.common.tempUser));
        this.router.navigate(['choose']);
      }
    }));
  }

  onSendSms() {
    const urlSms = 'sendSms&mobile=' + this.common.recoveryPhoneVal;
    this.subscriptions.push(this.common.get(urlSms).subscribe(resp => {
      alert(resp.json()[2]);
    }));
  }

}
