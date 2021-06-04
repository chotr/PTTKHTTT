import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
  Router,
} from '@angular/router';
import { Observable } from 'rxjs';
import { LoginService } from '../services/login.service';

@Injectable({
  providedIn: 'root',
})
export class LoginAugthGuard implements CanActivate {
  constructor(public auth: LoginService, public router: Router) {}
  canActivate(): boolean {
    const account = JSON.parse(localStorage.getItem('account') as string);
    if (account !== null) {
      return true;
    }
    this.router.navigate(['login']);
    return false;
  }
}
