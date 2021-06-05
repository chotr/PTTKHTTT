import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/provider/services/login.service';
import { AccountService } from '../../provider/services/account.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  isLogin: boolean;

  loginService: boolean = false;

  accountInfo: any

  constructor(
    private loginSer: LoginService,
    private router: Router,
    private accountService: AccountService
  ) {}

  ngOnInit(): void {


    const account = JSON.parse(localStorage.getItem('account') as string);
    if (account === null) {
      this.accountInfo = null;
    }
    this.accountInfo = account;
  }
  logout() {
    const account = JSON.parse(localStorage.getItem('account') as string);
    if (account !== null) {
      localStorage.removeItem('account');
    }
    window.location.reload();
    this.router.navigate(['/login']);
  }
  
}
