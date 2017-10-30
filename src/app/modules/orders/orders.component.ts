import {Component, OnDestroy, OnInit} from '@angular/core';
import {Location} from '@angular/common';
import {Router} from '@angular/router';
import {CommonService} from '../../services/common.service';
import {Subscription} from 'rxjs/Subscription';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class OrdersComponent implements OnInit, OnDestroy {

  /**
   * Var to show/hide modal the authorized window
   */
  noOrders = true;
  not_logged_in = true;
  is_loading = true;

  /**
   * Var to show/hide modal the modal window
   */
  modal = false;
  modalReview = false;
  modalDesc = false;

  orders = [];
  ordersCompleted = [];

  revTitle: string;
  revDescription: string;
  selectedOrder;

  /**
   * Vars to hide/show html containers
   */
  tap = true;

  private currentMark: HTMLElement;
  private nav1: HTMLElement;
  private nav2: HTMLElement;
  private months = [
    'янв', 'фев', 'мар', 'апр', 'мая', 'июня', 'июля',
    'авг', 'сен', 'окт', 'ноя', 'дек'
  ];
  private orderMarkId: string;
  private subscriptions: Subscription[] = [];

  constructor(private location: Location,
              private router: Router,
              private common: CommonService) {
  }

  ngOnInit() {
    this.common.fromOrderCreate = false;
    this.getOrdersFromApi('getOrders&type=active');
    this.checkUserLoggedIn();
  }

  ngOnDestroy() {
    while (this.subscriptions.length) {
      this.subscriptions.pop().unsubscribe();
    }
  }

  checkUserLoggedIn() {
    let auth = JSON.parse(this.common.storage.getItem('auth'));
    if (this.common.storage.getItem('user') && JSON.parse(this.common.storage.getItem('user')).name
      && JSON.parse(this.common.storage.getItem('user')).phone || auth === true) {
      this.not_logged_in = false;
    } else {
      this.not_logged_in = true;
      this.noOrders = false;
      this.is_loading = false;
    }
  }


  onRedirectToChat(orderId) {
    this.common.currentOrderId = orderId;
    this.common.showAttachIcon = true;
    this.router.navigate(['chat']);
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

  onClickReview(order) {
    this.orderMarkId = order.id;
    this.modalReview = true;
  }

  onClickMark(mark) {
    if (!this.currentMark) {
      this.currentMark = mark;
      this.currentMark.classList.add('rev-active');
    } else if (this.currentMark.classList.contains('rev-active')) {
      this.currentMark.classList.remove('rev-active');
      this.currentMark = mark;
      this.currentMark.classList.add('rev-active');
    }
  }

  onSendOrderMark() {
    const order = '&orderId=' + this.orderMarkId;
    const score = '&score=' + this.currentMark.innerHTML;
    const comment = '$comment=' + this.revTitle + '\/n' + this.revDescription;
    const url = 'markStars' + order + score + comment;
    this.subscriptions.push(this.common.get(url).subscribe(data => {
    }));
  }

  /**
   * Handler to hide/show Info container
   */
  onClickTap1() {
    this.nav1 = document.getElementById('navTap1');
    this.nav2 = document.getElementById('navTap2');
    this.nav2.style.border = 'none';
    this.nav1.style.borderBottom = '3px #2196F3 solid';
    this.tap = !this.tap;
  }

  /**
   * Handler to hide/show Reviews container
   */
  onClickTap2() {
    this.nav1 = document.getElementById('navTap1');
    this.nav2 = document.getElementById('navTap2');
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

  onClickOverModalRev(event) {
    const modalWindow = document.getElementById('modalRev');
    if (event.target === modalWindow) {
      this.modalReview = false;
    }
  }

  onClickOverModalDesc(event) {
    const modalWindow = document.getElementById('modalDesc');
    if (event.target === modalWindow) {
      this.modalDesc = false;
      document.body.style.overflow = 'auto';
    }
  }

  /**
   * Handler to navigate to orderComp description page
   */
  onClickDesc(order) {
    this.selectedOrder = order;
    this.modalDesc = true;
    document.body.style.overflow = 'hidden';
  }

  onModalClose() {
    this.modalDesc = false;
    document.body.style.overflow = 'auto';
  }

  private getOrdersFromApi(url) {
    this.subscriptions.push(this.common.get(url).subscribe(data => {
      const resp = data.json();
      if (resp[0] === 'ok') {
        this.noOrders = false;
        this.is_loading = false;
        const orders = resp[1];
        this.sortOrders(orders);
      } else {
        this.is_loading = false;
      }
    }));
  }

  private sortOrders(orders) {
    for (const order of orders) {
      if (order.status === 'completed') {
        this.ordersCompleted.push(order);
      } else if (order.status === 'accepted') {
        this.orders.push(order);
      }
    }
    this.setMonth(orders);
  }

  /**
   * Created self solution, but you can implement toLocaleString()
   * @param orders
   */
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
