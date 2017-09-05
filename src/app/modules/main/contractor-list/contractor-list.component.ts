import {Component, OnInit} from '@angular/core';
import {Location} from '@angular/common';
import {ActivatedRoute, Router} from '@angular/router';
import {RequestService} from '../../../services/request.service';

@Component({
  selector: 'app-contractor-list',
  templateUrl: './contractor-list.component.html',
  styleUrls: ['./contractor-list.component.css']
})
export class ContractorListComponent implements OnInit {

  masters;
  masterDesc;
  modal = false;
  reviews = false;
  private navInfo: HTMLElement;
  private navRev: HTMLElement;

  constructor(private location: Location,
              private router: Router,
              private route: ActivatedRoute,
              private requestService: RequestService) {
  }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.requestService.get('http://namba.usta.asia/api.php?todo=getAgents&serviceid=' + params['id'])
        .subscribe(data => {
          this.masters = data.json();
        });
    });
  }

  onClickBack() {
    this.location.back();
  }

  /**
   * Handler for show modal window
   */
  onClickDesc(master) {
    console.log(master);
    this.masterDesc = master;
    this.modal = true;
  }

  /**
   * When the user clicks anywhere outside of the modal, close it
   * @param event
   */
  onClickOverModal(event) {
    const modalWindow = document.getElementById('modal');
    if (event.target === modalWindow) {
      this.modal = false;
      this.reviews = false;
    }
  }

  /**
   * Handler for hide/show Reviews container
   */
  onClickRev() {
    this.navInfo = document.getElementById('masterInfo');
    this.navRev = document.getElementById('masterRev');
    this.reviews = true;
    this.navInfo.style.border = 'none';
    this.navRev.style.borderBottom = '3px #2196F3 solid';
  }

  /**
   * Handler for hide/show Info container
   */
  onClickInfo() {
    this.reviews = false;
    this.navInfo.style.borderBottom = '3px #2196F3 solid';
    this.navRev.style.borderBottom = 'none';
  }

  /**
   * Handler for navigate to profile page
   */
  onClickChoose() {
    this.router.navigate(['contacts']);
  }
}
