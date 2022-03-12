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
    this.onClickedOutside();
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
  onClickedOutside() {
    const ignoreClickOnMeElement = document.getElementById('navbar-client');
    document.addEventListener('click', function (event) {
      const isClickInsideElement = ignoreClickOnMeElement.contains(
        <HTMLElement>event.target
      );
      if (!isClickInsideElement) {
        document.getElementById('menuBtn').className =
          'navbar-toggler collapsed';
        document.getElementById('navbarCollapse').className =
          'navbar-collapse collapsing';
        // setTimeout(() => {
        //   document.getElementById('navbarCollapse').className =
        //   'navbar-collapse collapse';
        // }, 350);
      }
    });
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
          element.classList.remove('nav-fixed-top');
        }
      },
      false
    );
  }
}
