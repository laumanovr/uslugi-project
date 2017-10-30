import {Component, OnInit} from '@angular/core';
import {Location} from '@angular/common';
import {Router} from '@angular/router';
import {CommonService} from '../../../services/common.service';

@Component({
  selector: 'app-choose-type',
  templateUrl: './choose-type.component.html',
  styleUrls: ['./choose-type.component.css']
})
export class ChooseTypeComponent implements OnInit {

  master;

  constructor(private location: Location,
              private router: Router, private common: CommonService) {
  }


  ngOnInit() {
    this.master = JSON.parse(this.common.storage.getItem('master'));
  }

  /**
   * Handler for navigate back
   */
  onClickBack() {
    this.location.back();
  }

  onClick() {
    this.router.navigate(['master-call']);
  }

  onClickOperator() {
    this.common.showAttachIcon = true;
    this.orderCreate();
  }

  private orderCreate() {
    const url = 'createorder';
    const body = '&serviceid=' + this.common.storage.getItem('serviceId') + '&agent=' + this.master.id
      + '&mobile=' + this.common.storage.getItem('orderPhone');
    this.common.post(url, body).subscribe(resp => {
      this.common.currentOrderId = resp.json()[2];
      this.router.navigate(['chat']);
      console.log(resp);
    });
  }
}
