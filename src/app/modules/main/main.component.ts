import {Component, OnInit} from '@angular/core';
import {RequestService} from '../../services/request.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  services;

  constructor(private router: Router,
              private requestService: RequestService) {
  }

  ngOnInit() {
    this.getListOfMasters();
  }

  onClick(id) {
    this.router.navigate(['contractors'], {queryParams: {id: id}});
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
