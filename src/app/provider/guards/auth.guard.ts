import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router){
    
  }
  canActivate(): boolean {
    const account = JSON.parse(localStorage.getItem('account') as string);
    if (account && account.maLoaiNguoiDung === 'QuanTri') {
      return true;
      
    }
    this.router.navigate(['client/login'])
    return false;
  }
}
