import { HttpClientModule } from '@angular/common/http';
import { Injectable } from '@angular/core';
// import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  // constructor(public jwtHelper: JwtHelperService) {}
  // ...
  public isAuthenticated(): boolean {
    // const token = localStorage.getItem('account');
    // return !this.jwtHelper.isTokenExpired(token);}
    return true;
  }
  }
