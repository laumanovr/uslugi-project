import { Component, OnInit } from '@angular/core';
import {Location} from '@angular/common';
import {Router} from '@angular/router';

@Component({
  selector: 'app-contractor-list',
  templateUrl: './contractor-list.component.html',
  styleUrls: ['./contractor-list.component.css']
})
export class ContractorListComponent implements OnInit {

  constructor(private location: Location,
              private router: Router) { }

  ngOnInit() {
  }

  onClickBack() {
    this.location.back();
  }

  onClick() {
    this.router.navigate(['contractor-info']);
  }
}
