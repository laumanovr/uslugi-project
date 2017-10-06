import {AfterViewInit, Component, Input} from '@angular/core';

import Swiper from 'swiper';

@Component({
  selector: 'app-swipe',
  templateUrl: './swipe.component.html',
  styleUrls: ['./swipe.component.scss']
})
export class SwipeComponent implements AfterViewInit {

  @Input() photos;
  count = 0;
  imgPopup = false;
  imgClicked;

  constructor() {
  }

  ngAfterViewInit() {
    this.swiperInit();
  }

  onOpenPhoto(selectedImg) {
    this.imgPopup = true;
    this.imgClicked = selectedImg;
    this.checkImgIndex(selectedImg);
  }

  onNextPhoto() {
    if (this.count < this.photos.length - 1) {
      this.count++;
      this.imgClicked = this.photos[this.count];
    }
  }

  onPrevPhoto() {
    if (this.count !== 0) {
      this.count--;
      this.imgClicked = this.photos[this.count];
    }
  }

  onOverPhoto(event) {
    const modalWindow = document.getElementById('photo');
    if (event.target === modalWindow) {
      this.imgPopup = false;
    }
  }

  private checkImgIndex(img) {
    this.photos.forEach((val, i) => {
      if (val === img) {
        this.count = i;
      }
    });
  }

  private swiperInit() {
    const swiper = new Swiper('.swiper-container', {
      width: 70,
    });
  }

}
