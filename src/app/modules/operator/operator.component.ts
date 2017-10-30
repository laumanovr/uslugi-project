import {Component, OnDestroy, OnInit} from "@angular/core";
import {Router} from "@angular/router";
import {CommonService} from "../../services/common.service";

@Component({
  selector: 'app-operator',
  templateUrl: './operator.component.html',
  styleUrls: ['./operator.component.scss']
})
export class OperatorComponent implements OnInit, OnDestroy {

  oldDialogs: any;
  is_loading = true;

  constructor(private router: Router, private common: CommonService) {
  }

  ngOnInit() {
    this.common.connectionEvents.on('listChats', (data) => {
      this.oldDialogs = data;
      this.is_loading = false;
      console.log(this.oldDialogs);
    });

    if (this.common.logged) {
      this.loadChats();
    } else {
      setTimeout(() => {
        this.loadChats();
      }, 2000);
    }
  }

  ngOnDestroy() {
    this.common.connectionEvents.removeAllListeners('listChats');
  }

  onCallOperator() {
    this.common.showAttachIcon = false;
    this.router.navigate(['chat']);
  }

  loadChats() {
    console.log('Try load chats');
    this.common.connection.send(JSON.stringify({
      action: 'listChats',
      params: {}
    }));
  }

  onRedirectToHistoryDialog(serviceId) {
    this.common.showAttachIcon = false;
    this.common.storage.setItem('serviceId', serviceId);
    this.router.navigate(['chat']);
  }
}
