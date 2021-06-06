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

  constructor(private accountService :AccountService) { }

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
