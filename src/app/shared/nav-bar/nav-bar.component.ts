import {Component, OnInit} from '@angular/core';
import * as Icons from '../../utils/icons';
import {Router} from '@angular/router';
import {orders} from '../../utils/icons';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {

  /**
   * Handler for icons
   */
  ico = Icons;

  /**
   * Vars for get element from DOM
   */
  mainLink: HTMLElement;
  homeIcon: HTMLElement;
  homeIconBottom: HTMLElement;
  ordersLink: HTMLElement;
  ordersIcon: HTMLElement;
  ordersIconBottom: HTMLElement;
  profileLink: HTMLElement;
  profileIcon: HTMLElement;
  profileIconBottom: HTMLElement;
  supportLink: HTMLElement;
  supportIcon: HTMLElement;

  constructor(private router: Router) {
  }

  ngOnInit() {
    this.mainLink = document.getElementById('home');
    this.homeIcon = document.getElementById('homeIcon');
    this.homeIconBottom = document.getElementById('homeIconBottom');
    this.ordersLink = document.getElementById('orders');
    this.ordersIcon = document.getElementById('ordersIcon');
    this.ordersIconBottom = document.getElementById('ordersIconBottom');
    this.profileLink = document.getElementById('profile');
    this.profileIcon = document.getElementById('profileIcon');
    this.profileIconBottom = document.getElementById('profileIconBottom');
    this.supportLink = document.getElementById('support');
    this.supportIcon = document.getElementById('HTMLElement');
    this.checkLocation();
  }

  /**
   * Navigate to home
   */
  onClickHome() {
    this.router.navigate(['']);
  }

  /**
   * Navigate to orders
   */
  onClickOrders() {
    this.router.navigate(['orders']);
  }

  /**
   * Navigate to profile
   */
  onClickProfile() {
    this.router.navigate(['login']);
  }

  /**
   * Navigate to operator
   */
  onClickOperator() {
    this.router.navigate(['operator']);
  }


  /**
   * Handler to check out location and painting icons
   */
  private checkLocation() {
    const loc = window['location'];
    switch (loc.pathname) {
      case '/':
        this.mainLink.className += 'activeli';
        this.homeIcon.style.color = '#2196f3';
        this.homeIconBottom.style.color = '#2196f3';
        break;
      case '/orders':
        this.ordersLink.className += 'activeli';
        this.ordersIcon.style.color = '#2196f3';
        this.ordersIconBottom.style.color = '#2196f3';
        break;
      case '/login':
      case '/profile':
        this.profileLink.className += 'activeli';
        this.profileIcon.style.color = '#2196f3';
        this.profileIconBottom.style.color = '#2196f3';
        break;
    }
  }
}
