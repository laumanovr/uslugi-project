import {AfterViewInit, Component, Input, OnInit} from '@angular/core';

import Swiper from 'swiper';

@Component({
  selector: 'app-swipe',
  templateUrl: './swipe.component.html',
  styleUrls: ['./swipe.component.scss']
})
export class SwipeComponent implements OnInit, AfterViewInit {

  @Input() photos;

  constructor() {
  }

  ngOnInit() {
  }

  ngAfterViewInit() {
    this.swiperInit();
  }

  private swiperInit() {
    const swiper = new Swiper('.swiper-container', {
      width: 70,
    });
  }

}
