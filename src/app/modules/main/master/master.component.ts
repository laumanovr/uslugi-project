import {Component, OnInit} from '@angular/core';
import {Location} from '@angular/common';
import {Router} from '@angular/router';
import {CommonService} from '../../../services/common.service';

@Component({
  selector: 'app-master',
  templateUrl: './master.component.html',
  styleUrls: ['./master.component.scss']
})
export class MasterComponent implements OnInit {

  modal = false;
  master;
  popup = false;
  secondCall = false;
  videoModal = false;
  audioModal = false;
  masterCallModal = false;
  masterAvatar: any;

  constructor(private location: Location,
              private router: Router,
              private common: CommonService) {
  }

  ngOnInit() {
    this.master = JSON.parse(this.common.storage.getItem('master'));
    this.masterAvatar = this.master.photo[0];
  }

  closePopup(event) {
    this.popup = false;
  }

  /**
   * Handler for navigate back
   */
  onClickBack() {
    this.location.back();
  }

  onCall() {
    this.modal = true;
    this.checkFirstCall();
  }

  onNavContractors() {
    this.common.fromMasterPage = true;
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

  private checkFirstCall() {
    if (!this.secondCall) {
      this.orderCreate(event);
      this.secondCall = true;
    }
  }

   orderCreate(event) {
    this.common.showAttachIcon = true;
    const url = 'createorder';
    const body = '&serviceid=' + this.common.storage.getItem('serviceId') + '&agent=' + this.master.id
      + '&mobile=' + this.common.storage.getItem('orderPhone');
    this.common.post(url, body).subscribe(resp => {
      this.common.currentOrderId = resp.json()[2];
      const createWithOper = document.getElementById('createWithOperator');
      if (event.target === createWithOper) {
        this.router.navigate(['chat']);
      } else {
        this.common.fromMasterPage = true;
        this.modal = true;
      }
      console.log(resp);
    });
  }

  onStartVideoCall(){
    this.modal = false;
    this.videoModal = true;
  }

  onCompleteVideoCall(){
    this.videoModal = false;
  }

  onStartAudioCall(){
    this.modal = false;
    this.audioModal = true;
  }

  onCompleteAudioCall(){
    this.audioModal = false;
  }

  onStartMasterCallAudio(){
    this.modal = false;
    this.masterCallModal = true;
  }

  onCompleteMasterCall(){
    this.masterCallModal = false;
  }
}
