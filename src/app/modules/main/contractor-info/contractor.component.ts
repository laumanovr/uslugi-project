import {Component, OnInit} from '@angular/core';
import {Location} from '@angular/common';
import {Router} from '@angular/router';

@Component({
  selector: 'app-contractor',
  templateUrl: './contractor.component.html',
  styleUrls: ['./contractor.component.css']
})
export class ContractorComponent implements OnInit {

  /**
   * Vars for hide/show html containers
   */
  private infoCont: HTMLElement;
  private revCont: HTMLElement;
  private navInfo: HTMLElement;
  private navRev: HTMLElement;

  constructor(private location: Location,
              private router: Router) {
  }

  ngOnInit() {
    this.infoCont = document.getElementById('infoCont');
    this.revCont = document.getElementById('revCont');
    this.navInfo = document.getElementById('navInfo');
    this.navRev = document.getElementById('navRev');
  }

  /**
   * Handler for navigate back
   */
  onClickBack() {
    this.location.back();
  }

  /**
   * Handler for hide/show Info container
   */
  onClickInfo() {
    this.infoCont.style.display = 'block';
    this.navInfo.style.borderBottom = '3px #2196F3 solid';
    this.navRev.style.borderBottom = 'none';
    this.revCont.style.display = 'none';
  }

  /**
   * Handler for hide/show Reviews container
   */
  onClickRev() {
    this.revCont.style.display = 'block';
    this.infoCont.style.display = 'none';
    this.navInfo.style.border = 'none';
    this.navRev.style.borderBottom = '3px #2196F3 solid';
  }

  /**
   * Handler for navigate to profile page
   */
  onClickChoose() {
    this.router.navigate(['master-call']);
  }
}
