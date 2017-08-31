import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {RequestService} from '../../services/request.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  services;

  constructor(private router: Router,
              private requestService: RequestService) {
  }

  ngOnInit() {
    this.getListOfMasters();
  }

  onClick(id) {
    this.router.navigate(['contractor-list'], {queryParams: {id: id}});
  }

  /**
   * Get list of masters from api
   */
  private getListOfMasters() {
    this.requestService.get('https://usluga.namba1.co/api.php?todo=getservices')
      .subscribe((data) => {
        this.services = data.json();
      });
  }
}
