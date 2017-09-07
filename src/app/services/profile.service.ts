import {Injectable} from '@angular/core';

@Injectable()
export class ProfileService {

  name: string;
  phone: string;
  email: string;
  userCreated = false;

  constructor() {
  }

}
