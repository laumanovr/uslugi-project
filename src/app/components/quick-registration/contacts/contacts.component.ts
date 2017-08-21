import {Component, OnInit} from '@angular/core';
import {Location} from '@angular/common';
import {Router} from '@angular/router';

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.css']
})
export class ContactsComponent implements OnInit {

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
    this.router.navigate(['quick-registration/code']);
  }
}
