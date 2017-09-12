import {Component, OnInit} from '@angular/core';
import {Location} from '@angular/common';
import {Router} from '@angular/router';
import {ProfileService} from '../../services/profile.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class OrdersComponent implements OnInit {

  /**
   * Var to show/hide modal the authorized window
   */
  authorized = false;

  /**
   * Var to show/hide modal the modal window
   */
  modal = false;

  /**
   * Vars to hide/show html containers
   */
  tap = true;
  private nav1: HTMLElement;
  private nav2: HTMLElement;

  constructor(private location: Location,
              private router: Router,
              private profileService: ProfileService) {
  }

  ngOnInit() {
    this.authCheck();
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
   * Quick authorization check
   */
  private authCheck() {
    if (this.profileService.userCreated) {
      this.authorized = true;
    }
  }

}
