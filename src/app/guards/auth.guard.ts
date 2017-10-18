import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot} from '@angular/router';
import {CommonService} from '../services/common.service';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private common: CommonService) {
  }

  canActivate(next: ActivatedRouteSnapshot,
              state: RouterStateSnapshot): boolean {
    return Boolean(this.common.storage.getItem('auth'));
  }
}
