import {Component, OnDestroy, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {MasterService} from '../../services/master.service';
import {Subscription} from 'rxjs/Subscription';
import {CustomRequest} from '../../services/request.service';
import {ProfileService} from '../../services/profile.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit, OnDestroy {

  services;

  private subscriptions: Subscription[] = [];

  constructor(private router: Router,
              private requestService: CustomRequest,
              private masterService: MasterService,
              private profile: ProfileService) {
  }

  ngOnInit() {
    this.masterService.fromMasterPage = false;
    this.profile.fromOrderCreate = false;
    this.getListOfMasters();
  }

  ngOnDestroy() {
    while (this.subscriptions.length) {
      this.subscriptions.pop().unsubscribe();
    }
  }

  onClick(id) {
    this.masterService.selectedService = id;
    this.router.navigate(['contractors']);
  }

  /**
   * Get list of masters from api
   */
  private getListOfMasters() {
    this.subscriptions.push(this.requestService.get('https://usluga.namba1.co/api.php?todo=getservices')
      .subscribe((data) => {
        this.services = data.json();
      }));
  }
}
