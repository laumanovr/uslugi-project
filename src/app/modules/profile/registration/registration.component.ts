import {Component, OnDestroy, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {Location} from '@angular/common';
import {Subscription} from 'rxjs/Subscription';
import {CustomRequest} from '../../../services/request.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit, OnDestroy {

  emailValue: string;
  nameValue: string;
  phoneValue: string;
  passValue: string;

  private button: HTMLElement;
  private checkBox = true;
  private subscription: Subscription;

  constructor(private router: Router,
              private location: Location,
              private requestService: CustomRequest) {
  }

  ngOnInit() {
    (<HTMLInputElement>document.getElementById('checkBox')).checked = true;
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

  /**
   * Handler to change the button colors
   */
  checkFormValid() {
    // const buttonDisabled = (<HTMLInputElement> document.getElementById('btn')).disabled;
    // if (buttonDisabled === false) {
    //   this.button.style.backgroundColor = '#FFC107';
    // } else {
    //   this.button.style.backgroundColor = '#E5E5E5';
    // }
  }

  onClickRegBTn() {
    const urlPart = 'https://usluga.namba1.co/api.php?todo=create_client';
    const name = '&firstname=' + this.nameValue;
    const phone = '&mobile=' + this.phoneValue;
    const pass = '&password=' + this.passValue;
    const url = urlPart + name + phone + pass;
    this.subscription = this.requestService.get(url).subscribe(resp => {
      const userCreated = resp.json()[0];
      if (userCreated === 'ok') {
        this.router.navigate(['profile']);
      } else {
        console.log(resp.json()[1]);
      }
    });
  }

  onCheckBox() {
    const checkBox = (<HTMLInputElement>document.getElementById('checkBox')).checked;
  }

}
