import {Component, OnDestroy, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {Subscription} from 'rxjs/Subscription';
import {CommonService} from '../../services/common.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit, OnDestroy {

  services;

  private subscriptions: Subscription[] = [];

  constructor(private router: Router,
              private common: CommonService) {
  }

  ngOnInit() {
    this.common.fromMasterPage = false;
    this.common.fromOrderCreate = false;
    this.getListOfMasters();
  }

  ngOnDestroy() {
    while (this.subscriptions.length) {
      this.subscriptions.pop().unsubscribe();
    }
  }

  onClick(id) {
    this.common.storage.setItem('serviceId', id);
    this.router.navigate(['contractors']);
  }

  /**
   * Get list of masters from api
   */
  private getListOfMasters() {
    this.subscriptions.push(this.common.get('getservices')
      .subscribe((data) => {
        this.services = data.json();
      }));
  }

}
