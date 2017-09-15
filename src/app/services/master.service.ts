import {Injectable} from '@angular/core';

@Injectable()
export class MasterService {

  currentPhone: string;
  fromMasterPage = false;
  selectedService: string;
  selectedMaster;

  constructor() {
  }

}
