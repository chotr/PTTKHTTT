import { HttpClientModule } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  isloggedin : boolean;
    constructor(private _http: HttpClientModule){
        this.isloggedin = false;
    }
}
