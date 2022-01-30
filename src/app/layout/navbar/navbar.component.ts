import { Component, HostListener, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { LoginService } from 'src/app/provider/services/login.service';
import { AccountService } from '../../provider/services/account.service';
import { ViewportScroller } from '@angular/common';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  isLogin: boolean;

  loginService: boolean = false;

  accountInfo: any;

  userName: any;

  showBox = true;

  constructor(
    private loginSer: LoginService,
    private router: Router,
    private accountService: AccountService,
    private viewportScroller: ViewportScroller
  ) {}

  ngOnInit(): void {
    const account = JSON.parse(localStorage.getItem('account') as string);
    if (account === null) {
      this.accountInfo = null;
    }
    if (account !== null) {
      this.userName = account.taiKhoan;
    }
    this.accountInfo = account;

    this.scrollNav();
  }
  public onClick(elementId: string): void {
    this.viewportScroller.scrollToAnchor(elementId);
  }
  logout() {
    const account = JSON.parse(localStorage.getItem('account') as string);
    if (account !== null) {
      localStorage.removeItem('account');
      this.router.navigate(['client/home']);
      window.location.reload();
    }
  }
  onClickedOutside(e: Event) {
    this.showBox = false;
  }
  scrollNav() {
    window.addEventListener(
      'scroll',
      function (event) {
        const element = document.getElementById('navbar-client');
        let top = this.scrollY;
        if (top >= 70) {
          element.classList.add('nav-fixed-top');
        } else {
          // if (top < 80) {
          //   element.classList.remove('nav-fixed-top');
          //   element.classList.add('nav-fixed-back');
          //   setTimeout(() => {
          //     element.classList.remove('nav-fixed-back');
          //   }, 0.6);
          // } else {
          //   element.classList.remove('nav-fixed-top');
          // }
          element.classList.remove('nav-fixed-top');
        }
      },
      false
    );
  }
}
