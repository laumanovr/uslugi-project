import { Component, OnInit } from '@angular/core';
import {Location} from '@angular/common';
import {Router} from '@angular/router';
import {MasterService} from '../../../services/master.service';
import {RequestService} from '../../../services/request.service';

@Component({
  selector: 'app-master',
  templateUrl: './master.component.html',
  styleUrls: ['./master.component.scss']
})
export class MasterComponent implements OnInit {

  master;
  modal = false;

  constructor(private location: Location,
              private router: Router,
              private masterService: MasterService,
              private requestService: RequestService) {
  }

  ngOnInit() {
    this.master = this.masterService.currentMaster;
  }

  /**
   * Handler for navigate back
   */
  onClickBack() {
    this.location.back();
  }

  onCall() {
    this.modal = true;
    // const serviceId = this.masterService.currentService;
    // const masterId = this.master.id;
    // const url = 'http://namba.usta.asia/api.php?todo=createorder';
    // const body = {
    //   serviceid: serviceId,
    //   agent: masterId
    // };
    // this.requestService.post(url, body).subscribe(data => {
    //   console.log(data);
    //   this.modal = true;
    // });
  }

  onNavContractors() {
    this.router.navigate(['contractors']);
  }

  onNavOperator() {
    this.router.navigate(['contractors']);
  }

  /**
   * When the user clicks anywhere outside of the modal, close it
   * @param event
   */
  onClickOverModal(event) {
    const modalWindow = document.getElementById('modal');
    if (event.target === modalWindow) {
      this.modal = false;
    }
  }
}
