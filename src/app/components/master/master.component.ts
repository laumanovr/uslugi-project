import { Component, OnInit } from '@angular/core';
import {Location} from '@angular/common';
import {Router} from '@angular/router';

@Component({
  selector: 'app-master',
  templateUrl: './master.component.html',
  styleUrls: ['./master.component.scss']
})
export class MasterComponent implements OnInit {

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

  onCall() {
  }

  onNavContractors() {
    this.router.navigate(['contractor-list']);
  }

  onNavOperator() {
    this.router.navigate(['contractor-list']);
  }
}
