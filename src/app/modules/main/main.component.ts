import {Component, OnDestroy, OnInit} from '@angular/core';
import {RequestService} from '../../services/request.service';
import {Router} from '@angular/router';
import {MasterService} from '../../services/master.service';
import {Subscription} from 'rxjs/Subscription';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit, OnDestroy {

  services;

  private subscription: Subscription;
  private subscription2: Subscription;

  constructor(private router: Router,
              private requestService: RequestService,
              private masterService: MasterService) {
  }

  ngOnInit() {
    console.log(document.cookie);
    this.getListOfMasters();
    this.subscription2 = this.requestService.get('https://usluga.namba1.co/api.php?todo=getClientData')
      .subscribe(resp => {
        console.log(resp);
      });
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
    if (this.subscription2) {
      this.subscription2.unsubscribe();
    }
  }

  onClick(id) {
    this.masterService.currentService = id;
    this.router.navigate(['contractors'], {queryParams: {id: id}});
  }

  /**
   * Get list of masters from api
   */
  private getListOfMasters() {
    this.subscription = this.requestService.get('https://usluga.namba1.co/api.php?todo=getservices')
      .subscribe((data) => {
        this.services = data.json();
      });
  }
}
