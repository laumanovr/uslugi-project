import {Component, OnInit} from '@angular/core';
import {Location} from '@angular/common';
import {Router} from '@angular/router';
import {MasterService} from '../../../services/master.service';
import {CustomRequest} from '../../../services/request.service';

@Component({
  selector: 'app-master',
  templateUrl: './master.component.html',
  styleUrls: ['./master.component.scss']
})
export class MasterComponent implements OnInit {

  modal = false;
  master;

  constructor(private location: Location,
              private router: Router,
              private masterService: MasterService,
              private requestService: CustomRequest) {
  }

  ngOnInit() {
    this.master = this.masterService.selectedMaster;
  }

  /**
   * Handler for navigate back
   */
  onClickBack() {
    this.location.back();
  }

  onCall() {
    this.modal = true;
    const url = 'https://usluga.namba1.co/api.php?todo=createorder';
    const body = {
      serviceid: this.masterService.selectedService,
      agent: this.masterService.selectedMaster.id,
      mobile: this.masterService.currentPhone,
    };
    this.requestService.post(url, body).subscribe(data => {
      console.log(data.json());
      this.masterService.fromMasterPage = true;
      this.modal = true;
    });
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
