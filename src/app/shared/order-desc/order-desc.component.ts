import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {CommonService} from "../../services/common.service";

@Component({
  selector: 'app-order-desc',
  templateUrl: './order-desc.component.html',
  styleUrls: ['./order-desc.component.scss']
})
export class OrderDescComponent implements OnInit {

  @Input() selectedOrder;
  @Output() modalClose = new EventEmitter<boolean>();

  imgClicked;
  imgPopup = false;

  private count = 0;
  private navInfo: HTMLElement;
  private navRev: HTMLElement;

  constructor(private common: CommonService) {
  }

  ngOnInit() {
    console.log(this.selectedOrder);
  }

  onAcceptOrder(id) {
    const url = 'updateorder' + '&orderid=' + id + '&status=accepted';
    this.common.get(url).subscribe(data => {

    });
  }

  onClose() {
    this.modalClose.emit(true);
  }

  onOpenPhoto(selectedImg) {
    this.imgPopup = true;
    this.imgClicked = selectedImg;
    this.checkImgIndex(selectedImg);
  }

  onNextPhoto() {
    if (this.count < this.selectedOrder.orderImagesArray.length - 1) {
      this.count++;
      this.imgClicked = this.selectedOrder.orderImagesArray[this.count];
    }
  }

  onPrevPhoto() {
    if (this.count !== 0) {
      this.count--;
      this.imgClicked = this.selectedOrder.orderImagesArray[this.count];
    }
  }

  onOverPhoto(event) {
    const modalWindow = document.getElementById('photo');
    if (event.target === modalWindow) {
      this.imgPopup = false;
    }
  }


  private checkImgIndex(img) {
    this.selectedOrder.orderImagesArray.forEach((val, i) => {
      if (val === img) {
        this.count = i;
      }
    });
  }

}
