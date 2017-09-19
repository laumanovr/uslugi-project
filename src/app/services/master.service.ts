import {Injectable} from '@angular/core';

@Injectable()
export class MasterService {

  orderPhone: string;
  orderName: string;
  fromMasterPage = false;
  selectedService: string;
  selectedMaster;

  constructor() {
  }

}
