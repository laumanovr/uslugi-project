import {Component, OnInit} from '@angular/core';
import {Location} from '@angular/common';
import {Router} from '@angular/router';
import {CommonService} from '../../services/common.service';
import {Subscription} from 'rxjs/Subscription';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class OrdersComponent implements OnInit {

  /**
   * Var to show/hide modal the authorized window
   */
  authorized = true;

  /**
   * Var to show/hide modal the modal window
   */
  modal = false;

  orders;
  /**
   * Vars to hide/show html containers
   */
  tap = true;

  private nav1: HTMLElement;
  private nav2: HTMLElement;
  private months = [
    'янв', 'фев', 'мар', 'апр', 'мая', 'июня', 'июля',
    'авг', 'сен', 'окт', 'ноя', 'дек'
  ];
  private subscription: Subscription;

  constructor(private location: Location,
              private router: Router,
              private common: CommonService) {
  }

  ngOnInit() {
    this.common.fromOrderCreate = false;
    this.authCheck();
    this.getOrdersFromApi();
    this.nav1 = document.getElementById('navTap1');
    this.nav2 = document.getElementById('navTap2');
  }

  /**
   * Handler to navigate back
   */
  onClickBack() {
    this.location.back();
  }

  /**
   * Navigate to auth page
   */
  onClickAuth() {
    this.router.navigate(['login']);
  }

  /**
   * Handler to hide/show Info container
   */
  onClickTap1() {
    this.nav2.style.border = 'none';
    this.nav1.style.borderBottom = '3px #2196F3 solid';
    this.tap = !this.tap;
  }

  /**
   * Handler to hide/show Reviews container
   */
  onClickTap2() {
    this.nav1.style.border = 'none';
    this.nav2.style.borderBottom = '3px #2196F3 solid';
    this.tap = !this.tap;
  }

  /**
   * When the user clicks anywhere outside of the modal, close it
   * @param event
   */
  onClickOverModal(event) {
    const modalWindow = document.getElementById('modal');
    if (event.target === modalWindow) {
      this.modal = false;
    }
  }

  /**
   * Handler to navigate to order description page
   */
  onClickDesc() {
    this.router.navigate(['description']);
  }

  /**
   * Handler to navigate to review page
   */
  onClickReview() {
    this.router.navigate(['review']);
  }

  /**
   * Quick authorization check
   */
  private authCheck() {
    if (this.common.userCreated) {
      this.authorized = true;
    }
  }

  private getOrdersFromApi() {
    const url = 'getOrders&type=active';
    this.subscription = this.common.get(url).subscribe(resp => {
      this.orders = resp.json()[1];
      this.setMonth(this.orders);
    });
  }

  private setMonth(orders) {
    for (const order of orders) {
      console.log(order);
      const monthString = order.orderDate.slice(3, 5) - 1;
      const monthNumber = Number(monthString);
      this.months.forEach((item, i, months) => {
        if (i === monthNumber) {
          order.month = item;
        }
      });
    }
  }
}
