import { Component, OnInit } from '@angular/core';
import { AccountService } from 'src/app/provider/services/account.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
})
export class UserComponent implements OnInit {
  userName: any;
  pass: any;
  name: any;
  email: any;
  phoneNumber: any;
  avatar: any;
  LoaiNguoiDung: any;
  emailf: any;
  userInfo = {
    taiKhoan: '',
    email: '',
    soDt: '',
    matKhau: '',
    hoTen: '',
    maNhom: 'GP09',
    maLoaiNguoiDung: '',
  };

  constructor(private accountService: AccountService) {}

  ngOnInit(): void {
    const account = JSON.parse(localStorage.getItem('account') as string);
    if (account !== null) {
      this.userName = account.taiKhoan;
      this.name = account.hoTen;
      this.email = account.email;
      this.phoneNumber = account.soDT;
      this.LoaiNguoiDung = account.maLoaiNguoiDung;
      this.userInfo.taiKhoan = account.taiKhoan;

      let first = account.taiKhoan;
      first = first.split('');
      this.avatar = first[0];
    }
    this.accountService.detailUser(this.userInfo).subscribe((res) => {
      this.pass = res.matKhau;
    });
  }
  getInfo(evt) {
    this.userInfo = {
      taiKhoan: evt.getAttribute('data-taiKhoan'),
      email: evt.getAttribute('data-email'),
      soDt: evt.getAttribute('data-phone'),
      hoTen: evt.getAttribute('data-hoTen'),
      maNhom: 'GP09',
      matKhau: this.pass,
      maLoaiNguoiDung: this.LoaiNguoiDung,
    };
  }
  getOutForm(evt) {
    this.userInfo = {
      taiKhoan: this.userName,
      email: evt.email,
      soDt: evt.soDt,
      hoTen: evt.hoTen,
      matKhau: this.pass,
      maNhom: 'GP09',
      maLoaiNguoiDung: this.LoaiNguoiDung,
    };
  }
 
  editSubmit() {
    let user = {
      taiKhoan: this.userName,
      matKhau: this.pass,
    };
    this.accountService.updateApi(this.userInfo).subscribe((data) => {
      if (data) {
        alert('Cập nhật thành công');
        this.accountService.loginApi(user).subscribe((data) => {
          localStorage.setItem('account', JSON.stringify(data));
        });
        window.location.reload();
      }
    });
  }
  getOutPass(evt) {
    this.pass = evt
  }
  passSubmit(){
    let user = {
      taiKhoan: this.userName,
      maNhom: 'GP09',
      email: this.email,
      maLoaiNguoiDung: this.LoaiNguoiDung,
      matKhau: this.pass,
    }
    this.accountService.updateApi(user).subscribe((data) => {
      if (data) {
        alert('Cập nhật thành công');
        window.location.reload();
      }
    });
    console.log(user)
    console.log(this.pass)
  }
}
