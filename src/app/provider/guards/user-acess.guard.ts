import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UserAcessGuard implements CanActivate {
  constructor() {}
  canActivate(): boolean {
    const account = JSON.parse(localStorage.getItem('account') as string);
    if (account !== null) {
      return true;
    }
    
    return false;
  }
  
}
