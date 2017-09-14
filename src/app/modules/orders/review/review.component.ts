import {Component, OnInit} from '@angular/core';
import {Location} from '@angular/common';

@Component({
  selector: 'app-review',
  templateUrl: './review.component.html',
  styleUrls: ['./review.component.scss']
})
export class ReviewComponent implements OnInit {

  marks = ['1', '2', '3', '4', '5'];

  constructor(private location: Location) {
  }

  ngOnInit() {
  }

  /**
   * Handler to navigate back
   */
  onClickBack() {
    this.location.back();
  }

  onClickMark(mark) {
  }

  onClickSend() {
  }
}
