import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-master-desc',
  templateUrl: './master-desc.component.html',
  styleUrls: ['./master-desc.component.scss']
})
export class MasterDescComponent implements OnInit {

  @Input() master;
  @Input() modal = false;
  @Input() shortDesc = true;
  @Output() modalClose = new EventEmitter<boolean>();
  reviews = false;
  imgPopup = false;
  imgClicked;
  private count = 0;
  private navInfo: HTMLElement;
  private navRev: HTMLElement;

  constructor() {
  }

  ngOnInit() {
  }

  /**
   * Handler to close popup
   * @param event
   */
  onOverModal(event) {
    const modalWindow = document.getElementById('modal');
    if (event.target === modalWindow) {
      this.modal = false;
      this.modalClose.emit(true);
    }
  }

  /**
   * Handler for hide/show Reviews container
   */
  onReviews() {
    this.reviews = true;
    this.navInfo = document.getElementById('masterInfo');
    this.navRev = document.getElementById('masterRev');
    this.navInfo.style.border = 'none';
    this.navRev.style.borderBottom = '3px #2196F3 solid';
  }

  /**
   * Handler for hide/show Info container
   */
  onInfo() {
    this.reviews = false;
    this.navInfo.style.borderBottom = '3px #2196F3 solid';
    this.navRev.style.borderBottom = 'none';
  }

  onOpenPhoto(selectedImg) {
    this.imgPopup = true;
    this.imgClicked = selectedImg;
    this.checkImgIndex(selectedImg);
  }

  onNextPhoto() {
    if (this.count < this.master.whork_images.length - 1) {
      this.count++;
      this.imgClicked = this.master.whork_images[this.count];
    }
  }

  onPrevPhoto() {
    if (this.count !== 0) {
      this.count--;
      this.imgClicked = this.master.whork_images[this.count];
    }
  }

  onOverPhoto(event) {
    const modalWindow = document.getElementById('photo');
    if (event.target === modalWindow) {
      this.imgPopup = false;
    }
  }


  private checkImgIndex(img) {
    this.master.whork_images.forEach((val, i) => {
      if (val === img) {
        this.count = i;
      }
    });
  }

}
