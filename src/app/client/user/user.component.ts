import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {
  userName: any
  name: any
  email: any
  phoneNumber: any

  constructor() { }

  ngOnInit(): void {
    const account = JSON.parse(localStorage.getItem('account') as string);
    if (account !== null) {
      this.userName = account.taiKhoan;
      this.name = account.hoTen;
      this.email = account.email;
      this.phoneNumber = account.soDT;
      
    }

  }

}
