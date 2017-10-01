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

  onSortByRating() {
    this.masters.sort((a, b) => {
      if (a.rating > b.rating) {
        return -1;
      } else {
        return 1;
      }
    });
  }

  onSortByPopular() {
    this.masters.sort((a, b) => {
      if (a.reviews.length > b.reviews.length) {
        return -1;
      }
      return 1;
    });
  }

  onSortByPrice() {
    // for (const master of this.masters) {
    //   const min = Number(master.price.substring(0, master.price.indexOf('-')));
    //   const max = Number(master.price.substring(master.price.indexOf('-') + 1));
    //   master.price = min + max / 2;
    // }
    this.masters.sort((a, b) => {
      if (a.price > b.price) {
        return 1;
      }
      return -1;
    });
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
