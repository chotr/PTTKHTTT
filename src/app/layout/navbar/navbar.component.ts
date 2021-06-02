import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/provider/services/login.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  loginService: boolean = false;

  constructor(private loginSer: LoginService) { 
    // this.loginService = loginSer
  }

  ngOnInit(): void {
  }

}
