import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-nav-admin',
  templateUrl: './nav-admin.component.html',
  styleUrls: ['./nav-admin.component.scss'],
})
export class NavAdminComponent implements OnInit {
  title: any;
  path: any;

  constructor(private router: Router) {
    router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {
        let url = event.url;
        let params = url.split('/');
        this.title = params[2];
        if (this.title === 'movie-management') {
          this.path = 'Quản lý phim';
        }
        if (this.title === 'user-management') {
          this.path = 'Quản lý người dùng';
        }
        if (this.title === 'dashboard') {
          this.path = 'Dashboard';
        }
        if (this.title === 'showtimes-management') {
          this.path = 'Quản lý lịch chiếu';
        }
      });
  }

  ngOnInit(): void {
  }
  
}
