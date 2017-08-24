import { Component, OnInit } from '@angular/core';
import {Location} from '@angular/common';
import {Router} from '@angular/router';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  /**
   * Vars for hide/show html containers
   */
  private tap1: HTMLElement;
  private tap2: HTMLElement;
  private nav1: HTMLElement;
  private nav2: HTMLElement;

  constructor(private location: Location,
              private router: Router) {
  }

  ngOnInit() {
    this.tap1 = document.getElementById('tap1');
    this.tap2 = document.getElementById('tap2');
    this.nav1 = document.getElementById('navTap1');
    this.nav2 = document.getElementById('navTap2');
  }

  /**
   * Handler for navigate back
   */
  onClickBack() {
    this.location.back();
  }

  /**
   * Handler for hide/show Info container
   */
  onClickTap1() {
    this.tap1.style.display = 'block';
    this.tap2.style.display = 'none';
    this.nav2.style.border = 'none';
    this.nav1.style.borderBottom = '3px #2196F3 solid';
  }

  /**
   * Handler for hide/show Reviews container
   */
  onClickTap2() {
    this.tap2.style.display = 'block';
    this.tap1.style.display = 'none';
    this.nav1.style.border = 'none';
    this.nav2.style.borderBottom = '3px #2196F3 solid';
  }

}
