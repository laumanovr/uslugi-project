import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {Location} from '@angular/common';
import {ProfileService} from '../../../services/profile.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {


  constructor(private router: Router,
              private location: Location,
              private profileService: ProfileService) {
  }

  ngOnInit() {
  }

  /**
   * Handler for navigate back
   */
  onClickBack() {
    this.location.back();
  }



}
