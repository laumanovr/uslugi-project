import {Component, OnDestroy, OnInit} from '@angular/core';
import {Location} from '@angular/common';
import {Router} from '@angular/router';
import {Subscription} from 'rxjs/Subscription';
import {CommonService} from '../../../services/common.service';

@Component({
  selector: 'app-contractor-list',
  templateUrl: './contractor-list.component.html',
  styleUrls: ['./contractor-list.component.scss']
})
export class ContractorListComponent implements OnInit, OnDestroy {

  dropdown = false;
  master;
  masters;
  popup = false;
  reviews = false;
  private sortCrutch1 = false;
  private sortCrutch2 = false;
  private subscription: Subscription;

  constructor(private location: Location,
              private router: Router,
              private common: CommonService) {
  }

  ngOnInit() {
    this.subscription = this.common.get('getAgents&serviceid=' + this.common.storage.getItem('serviceId'))
      .subscribe(data => {
        this.masters = data.json();
      });
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  closePopup(event) {
    this.popup = false;
    document.body.style.overflow = 'auto';
  }

  onClickBack() {
    this.location.back();
  }

  onDesc(master) {
    this.master = master;
    this.popup = true;
    document.body.style.overflow = 'hidden';
  }

  onSortByRating() {
    this.dropdown = false;
    if (!this.sortCrutch1) {
      this.masters.sort((a, b) => {
        if (a.rating > b.rating) {
          return -1;
        } else {
          return 1;
        }
      });
      this.sortCrutch1 = true;
      this.sortCrutch2 = false;
    }
  }

  onSortByPopular() {
    this.dropdown = false;
    if (!this.sortCrutch2) {
      this.masters.sort((a, b) => {
        if (a.reviews.length > b.reviews.length) {
          return -1;
        }
        return 1;
      });
      this.sortCrutch1 = false;
      this.sortCrutch2 = true;
    }
  }

  onSortByPrice() {
    this.dropdown = false;
    this.masters.sort((a, b) => {
      if (a.price > b.price) {
        return 1;
      }
      return -1;
    });
    this.sortCrutch1 = false;
    this.sortCrutch2 = false;
  }

  /**
   * Handler for navigate to profile page
   */
  onClickChoose(master) {
    this.common.storage.setItem('master', JSON.stringify(master));
    if (this.common.fromMasterPage) {
      this.router.navigate(['master-call']);
    } else {
      this.router.navigate(['contacts']);
    }
  }

}
