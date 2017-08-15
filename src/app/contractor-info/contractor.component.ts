import { Component, OnInit } from '@angular/core';
import {Location} from '@angular/common';

@Component({
  selector: 'app-contractor',
  templateUrl: './contractor.component.html',
  styleUrls: ['./contractor.component.css']
})
export class ContractorComponent implements OnInit {

  constructor(private location: Location) { }

  ngOnInit() {
  }

  onClickBack() {
    this.location.back();
  }

}
