import {Component, OnDestroy, OnInit} from '@angular/core';
import {Location} from '@angular/common';
import {Router} from '@angular/router';
import {Subscription} from 'rxjs/Subscription';
import {CommonService} from '../../../services/common.service';

@Component({
  selector: 'app-contractor-list',
  templateUrl: './contractor-list.component.html',
  styleUrls: ['./contractor-list.component.css']
})
export class ContractorListComponent implements OnInit, OnDestroy {

  master;
  masters;
  popup = false;
  reviews = false;
  private subscription: Subscription;

  constructor(private location: Location,
              private router: Router,
              private common: CommonService) {
  }

  ngOnInit() {
    this.subscription = this.common.get('getAgents&serviceid=' + this.common.selectedService)
      .subscribe(data => {
        this.masters = data.json();
        console.log(this.masters);
      });
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  closePopup(event) {
    this.popup = false;
  }

  onClickBack() {
    this.location.back();
  }

  onDesc(master) {
    this.master = master;
    this.popup = true;
  }

  /**
   * Handler for navigate to profile page
   */
  onClickChoose(master) {
    this.common.selectedMaster = master;
    if (this.common.fromMasterPage) {
      this.router.navigate(['master-call']);
    } else {
      this.router.navigate(['contacts']);
    }
  }

}
