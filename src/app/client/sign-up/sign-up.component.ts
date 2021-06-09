import { Component, OnInit, ViewChild } from '@angular/core';
import { AccountService } from 'src/app/provider/services/account.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss'],
})
export class SignUpComponent implements OnInit {

  @ViewChild('signUpForm') signUpFormTag: any;

  regexEmail = "^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$"
  constructor(private accountService: AccountService) {}

  ngOnInit(): void {}
  signUp(form: any): void {
    const { value } = form;
    const signUp = {
      taiKhoan: value.account,
      matKhau: value.password,
      email: value.email,
      soDt: value.phone,
      maNhom: 'GP09',
      maLoaiNguoiDung: 'khachHang',
      hoTen: value.name,
    };
    this.accountService.signUpApi(signUp).subscribe((res) => {
      if (res) {
        alert('Thành công');
      }
    });
  }

  isSubmitedForm(): boolean {
    return this.signUpFormTag.submitted
    
  }
}
