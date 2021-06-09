import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {
  title: any;
  path: any;

  constructor(private router: Router) { }

  ngOnInit(): void {
    this.pathAdmin();
    
  }
  pathAdmin(){
    let url = this.router.url;
    let params = url.split("/");
    this.title = params[2];
    console.log(this.title);
    if (this.title === 'movie-management') {
      this.path = 'Quản lý phim'
    }
    if (this.title === 'user-management') {
      this.path = 'Quản lý người dùng'
    }
    if (this.title === 'dashboard') {
      this.path = 'Dashboard';
    }
    if (this.title === 'showtimes-management') {
      this.path = 'Quản lý lịch chiếu';
    }
  }

}
