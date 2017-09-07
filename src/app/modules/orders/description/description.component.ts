import { Component, OnInit } from '@angular/core';
import {Location} from '@angular/common';

@Component({
  selector: 'app-description',
  templateUrl: './description.component.html',
  styleUrls: ['./description.component.scss']
})
export class DescriptionComponent implements OnInit {

  constructor(private location: Location) { }

  ngOnInit() {
  }

  /**
   * Handler to navigate back
   */
  onClickBack() {
    this.location.back();
  }

}
