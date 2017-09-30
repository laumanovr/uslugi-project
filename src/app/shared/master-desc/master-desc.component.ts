import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';

@Component({
  selector: 'app-master-desc',
  templateUrl: './master-desc.component.html',
  styleUrls: ['./master-desc.component.scss']
})
export class MasterDescComponent implements OnInit {

  @Input() master;
  @Input() modal = false;
  @Input() shortDesc = true;
  @Output() modalClose = new EventEmitter<boolean>();
  reviews = false;
  private navInfo: HTMLElement;
  private navRev: HTMLElement;

  constructor() {
  }

  ngOnInit() {
    console.log(this.master);
  }

  /**
   * Handler to close popup
   * @param event
   */
  onOverModal(event) {
    const modalWindow = document.getElementById('modal');
    if (event.target === modalWindow) {
      this.modal = false;
      this.modalClose.emit(true);
    }
  }

  /**
   * Handler for hide/show Reviews container
   */
  onReviews() {
    this.reviews = true;
    this.navInfo = document.getElementById('masterInfo');
    this.navRev = document.getElementById('masterRev');
    this.navInfo.style.border = 'none';
    this.navRev.style.borderBottom = '3px #2196F3 solid';
  }

  /**
   * Handler for hide/show Info container
   */
  onInfo() {
    this.reviews = false;
    this.navInfo.style.borderBottom = '3px #2196F3 solid';
    this.navRev.style.borderBottom = 'none';
  }

}
