import {Component, OnDestroy, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {Location} from '@angular/common';
import {Subscription} from 'rxjs/Subscription';
import {CustomRequest} from '../../../services/request.service';
import {ProfileService} from '../../../services/profile.service';

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
              private request: CustomRequest,
              private profileService: ProfileService) {
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
    const urlPart = 'https://usluga.namba1.co/api.php?todo=updatePasswordBySms&code=';
    const url = urlPart + this.codeValue + '&mobile=' + this.profileService.phone + '&password=' + this.passValue;
    this.subscription = this.request.get(url).subscribe(resp => {
      console.log(resp.json());
    });
  }

}
