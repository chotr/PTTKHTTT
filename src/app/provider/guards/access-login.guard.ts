import { Injectable } from '@angular/core';
import {
  CanDeactivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
  Router,
} from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AccessLoginGuard implements CanDeactivate<unknown> {
  constructor(private router: Router) {}
  canDeactivate(): boolean {
    const account = JSON.parse(localStorage.getItem('account') as string);
    if (account !== null) {
      this.router.navigate(['/clients/home']);
      return true;
    }
    return false;
  }
}
