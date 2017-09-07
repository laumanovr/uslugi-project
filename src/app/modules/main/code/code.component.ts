import {Component, OnDestroy, OnInit} from '@angular/core';
import {Location} from '@angular/common';
import {Router} from '@angular/router';
import {RequestService} from '../../../services/request.service';
import {Subscription} from 'rxjs/Subscription';
import {ProfileService} from '../../../services/profile.service';

@Component({
  selector: 'app-code',
  templateUrl: './code.component.html',
  styleUrls: ['./code.component.css']
})
export class CodeComponent implements OnInit, OnDestroy {

  codeValue: string;
  subscription: Subscription;

  constructor(private location: Location,
              private router: Router,
              private request: RequestService,
              private profileService: ProfileService) {
  }

  ngOnInit() {
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  /**
   * Handler for navigate back
   */
  onClickBack() {
    this.location.back();
  }

  onClick() {
    const url = 'http://namba.usta.asia/api.php?todo=checkSms&code=' + this.codeValue + '&mobile=' + this.profileService.phone;
    this.subscription = this.request.get(url).subscribe(data => {
      if (data.statusText === 'OK') {
        this.profileService.userCreated = true;
        this.router.navigate(['choose']);
      }
    });
  }

}
