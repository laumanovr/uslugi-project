import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-wellcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss']
})
export class WelcomeComponent implements OnInit {

  constructor(private router: Router) {
  }

  ngOnInit() {
  }

  onCheckBox() {
    const checkBox = (<HTMLInputElement>document.getElementById('checkBox')).checked = true;
    console.log(checkBox);
  }

  onEnter() {
    this.router.navigate(['login']);
  }

  onRegistration() {
    this.router.navigate(['registration']);
  }

}
