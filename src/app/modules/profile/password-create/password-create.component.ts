import {Component, OnDestroy, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {Location} from '@angular/common';
import {Subscription} from 'rxjs/Subscription';
import {CommonService} from '../../../services/common.service';

@Component({
  selector: 'app-password-create',
  templateUrl: './password-create.component.html',
  styleUrls: ['./password-create.component.scss']
})
export class PasswordCreateComponent implements OnInit, OnDestroy {

  codeValue: string;
  passValue: string;
  subscription: Subscription;

  constructor(private location: Location,
              private router: Router,
              private common: CommonService) {
  }

  ngOnInit() {
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  onClickBack() {
    this.location.back();
  }

  onSave() {
    const urlPart = 'updatePasswordBySms&code=';
    const url = urlPart + this.codeValue + '&mobile=' + this.common.phone + '&password=' + this.passValue;
    this.subscription = this.common.get(url).subscribe(data => {
      console.log(data.json());
      const response = data.json()[0];
      if (response === 'ok') {
        this.checkRoutes();
      }
    });
  }

  private checkRoutes() {
    if (this.common.fromOrderCreate) {
      this.common.userAuth = true;
      this.router.navigate(['choose']);
    } else {
      this.router.navigate(['profile']);
    }
  }

}
