import {Component, OnInit} from '@angular/core';
import {Location} from '@angular/common';
import {Router} from '@angular/router';

@Component({
  selector: 'app-choose-type',
  templateUrl: './choose-type.component.html',
  styleUrls: ['./choose-type.component.css']
})
export class ChooseTypeComponent implements OnInit {

  constructor(private location: Location,
              private router: Router) {
  }


  ngOnInit() {
  }

  /**
   * Handler for navigate back
   */
  onClickBack() {
    this.location.back();
  }

  onClick() {
    this.router.navigate(['contractor-info']);
  }
}
