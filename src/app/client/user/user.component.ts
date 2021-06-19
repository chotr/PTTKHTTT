import { Component, OnInit } from '@angular/core';
import { AccountService } from 'src/app/provider/services/account.service';

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
  avatar: any;
  user: {
    taiKhoan:'',
    email:'',
    soDt:'',
    hoTen:''
  }

  constructor(private accountService :AccountService) { }

  ngOnInit(): void {
    const account = JSON.parse(localStorage.getItem('account') as string);
    if (account !== null) {
      this.userName = account.taiKhoan;
      this.name = account.hoTen;
      this.email = account.email;
      this.phoneNumber = account.soDT;

      let first = account.taiKhoan;
      first = first.split('');
      this.avatar = first[0];    
    }

  }
  getInfo(data: any) {
    this.user = {
      taiKhoan: data.getAttribute('data-taiKhoan'),
      email: data.getAttribute('data-email'),
      soDt: data.getAttribute('data-phone'),
      hoTen: data.getAttribute('data-hoTen'),
    }
  }

}
