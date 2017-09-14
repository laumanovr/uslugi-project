import {Component, OnDestroy, OnInit} from '@angular/core';
import {RequestService} from '../../services/request.service';
import {Router} from '@angular/router';
import {MasterService} from '../../services/master.service';
import {Subscription} from 'rxjs/Subscription';
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
              private requestService: RequestService,
              private masterService: MasterService,
              private profileService: ProfileService) {
  }

  ngOnInit() {
    this.getListOfMasters();
    this.subscriptions.push(this.requestService.get('https://usluga.namba1.co/api.php?todo=getClientData')
      .subscribe(resp => {
        const userAuth = resp.json()[2].name;
        if (userAuth !== '' && userAuth !== 'undefined') {
          this.profileService.userCreated = true;
        }
      }));
  }

  ngOnDestroy() {
    while (this.subscriptions.length) {
      this.subscriptions.pop().unsubscribe();
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
    this.subscriptions.push(this.requestService.get('https://usluga.namba1.co/api.php?todo=getservices')
      .subscribe((data) => {
        this.services = data.json();
      }));
  }
}
