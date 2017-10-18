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
    const url = 'checkSms&code=' + this.codeValue + '&mobile=' + this.common.phone;
    this.subscriptions.push(this.common.get(url).subscribe(data => {
      if (data.statusText === 'OK') {
        this.common.userAuth = true;
        this.router.navigate(['choose']);
      }
    }));
  }

  onSendSms() {
    const urlSms = 'smsSend&mobile=' + this.common.phone;
    this.subscriptions.push(this.common.get(urlSms).subscribe(resp => {
      console.log(resp.json());
    }));
  }

}
