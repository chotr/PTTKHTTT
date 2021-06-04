import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/provider/services/login.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  isLogin: boolean;

  loginService: boolean = false;

  constructor(private loginSer: LoginService, private router: Router) {
  }

  ngOnInit(): void {
    const account = JSON.parse(localStorage.getItem('account') as string);
        if (account !== null) {
          this.isLogin= true;
        }
        this.isLogin = false;
  }
}

