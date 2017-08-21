import {Component, OnInit} from '@angular/core';
import {Location} from '@angular/common';
import {Router} from '@angular/router';

@Component({
  selector: 'app-code',
  templateUrl: './code.component.html',
  styleUrls: ['./code.component.css']
})
export class CodeComponent implements OnInit {

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
    this.router.navigate(['choose']);
  }

}
