import { Component, OnInit, ViewChild } from '@angular/core';
import { AccountService } from 'src/app/provider/services/account.service';

@Component({
  selector: 'app-form-modal',
  templateUrl: './form-modal.component.html',
  styleUrls: ['./form-modal.component.scss'],
})
export class FormModalComponent implements OnInit {
  @ViewChild('signUpForm') signUpFormTag: any;

  states = [
    {name: 'KhachHang', abbrev: 'Khách hàng'},
    {name: 'QuanTri', abbrev: 'Quản trị'},
  ];

  regexEmail =
    '/^(([^<>()[].,;:s@"]+(.[^<>()[].,;:s@"]+)*)|(".+"))@(([^<>()[].,;:s@"]+.)+[^<>()[].,;:s@"]{2,})$/i';
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
      maLoaiNguoiDung:value.state.name,
      hoTen: value.name,
    };
    this.accountService.addUsser(signUp).subscribe((res) => {
      if (res) {
        alert('Thành công');
      this.signUpFormTag.reset();
      }
    });
  }
  ngAfterViewInit(): void {
    console.log(this.signUpFormTag);
  }
  
}
