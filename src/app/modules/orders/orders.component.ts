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
  noOrders = true;

  /**
   * Var to show/hide modal the modal window
   */
  modal = false;

  orders = [];
  ordersCompleted = [];

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
    this.getOrdersFromApi('getOrders&type=active');
    this.getOrdersFromApi('getOrders&type=inactive');
  }

  onAcceptOrder(id) {
    const url = 'updateorder' + '&orderid=' + id + '&status=accepted';
    this.common.get(url).subscribe(data => {
    });
  }

  // Todo: implement later
  onAbortOrder(id) {
    const url = 'updateorder' + '&orderid=' + id + '&status=aborted';
    this.common.get(url).subscribe(data => {
      console.log(data.json());
      this.getOrdersFromApi('getOrders&type=active');
    });
  }

  // Todo: delete later, made for tests
  onCompleteOrder(id) {
    const url = 'updateorder' + '&orderid=' + id + '&status=completed';
    this.common.get(url).subscribe(data => {
      console.log(data.json());
      this.getOrdersFromApi('getOrders&type=active');
    });
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

  private getOrdersFromApi(url) {
    this.subscription = this.common.get(url).subscribe(data => {
      const resp = data.json();
      console.log(resp[1]);
      if (resp[0] === 'ok') {
        this.noOrders = false;
        const orders = resp[1];
        this.sortOrders(orders);
        this.nav1 = document.getElementById('navTap1');
        this.nav2 = document.getElementById('navTap2');
      }
    });
  }

  private sortOrders(orders) {
    for (const order of orders) {
      if (order.status === 'completed') {
        this.ordersCompleted.push(order);
      } else {
        this.orders.push(order);
        console.log(this.orders);
      }
    }
    this.setMonth(orders);
  }

  private setMonth(orders) {
    for (const order of orders) {
      const monthString = order.orderDate.slice(3, 5) - 1;
      const monthNumber = Number(monthString);
      this.months.forEach((item, i) => {
        if (i === monthNumber) {
          order.month = item;
        }
      });
    }
  }
}
