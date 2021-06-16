import {
  AfterViewInit,
  Component,
  OnInit,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AccountService } from 'src/app/provider/services/account.service';

@Component({
  selector: 'app-user-management',
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.scss'],
})
export class UserManagementComponent implements OnInit, AfterViewInit {
  @ViewChild('signUpForm') signUpFormTag: NgForm;
  @ViewChild('updateForm') updateForm: NgForm

  regexEmail =
    '/^(([^<>()[].,;:s@"]+(.[^<>()[].,;:s@"]+)*)|(".+"))@(([^<>()[].,;:s@"]+.)+[^<>()[].,;:s@"]{2,})$/i';

  users = [];
  pageCurrent: any;
  numPerPage: number = 20;
  total: number;
  totalPage: number;
  disabled: boolean;
  isReady = false;
  listPage: any[] = [];
  conditionPre: boolean;
  conditionNext: boolean;
  totalPageArr: number[] = [];
  public disabledPage: boolean;
  public routerLinkVariable = '/admin/user-management';

  user =  {
    taiKhoan: '',
    matKhau: '',
    email: '',
    soDt: '',
    maNhom: 'GP09',
    maLoaiNguoiDung: '',
    hoTen: '',
  };

  constructor(
    private accountService: AccountService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.pageCurrent = this.activatedRoute.snapshot.paramMap.get(
      'page'
    ) as string;
    if (!this.pageCurrent) {
      this.getParamsFromUrl();
    }
    this.getDataUser(this.pageCurrent);
  }
  getParamsFromUrl() {
    this.activatedRoute.queryParams.subscribe((res) => {
      if (res) {
        this.pageCurrent = res.currentPage;
        this.total = res.totalCount;
        this.totalPage = res.totalPages;
      }
    });
  }
  getDataUser(page: any) {
    this.accountService.listUser(page, this.numPerPage).subscribe((res) => {
      if (res) {
        this.pageCurrent = res.currentPage;
        this.total = res.totalCount;
        this.users = res.items;

        this.totalPage = res.totalPages;
        for (let i = 1; i <= this.totalPage; i++) {
          this.totalPageArr.push(i);
        }
      }
    });
  }
  checkPre = (event) => {
    if (this.pageCurrent === 1) {
      if (!this.isReady) {
        event.preventDefault();
      }
    }
  };
  checkNext = (event) => {
    if (this.pageCurrent === this.totalPage) {
      if (!this.isReady) {
        event.preventDefault();
      }
    }
  };
  disabledPagePre(): boolean {
    if (this.pageCurrent === 1) {
      return false;
    }
    if (this.pageCurrent !== 1) {
      return true;
    }
  }
  disabledPageNext(): boolean {
    if (this.pageCurrent === this.totalPage) {
      return false;
    }
    if (this.pageCurrent !== this.totalPage) {
      return true;
    }
  }
  signUp(form: any): void {
    const { value } = form;
    const signUp = {
      taiKhoan: value.account,
      matKhau: value.password,
      email: value.email,
      soDt: value.phone,
      maNhom: 'GP09',
      maLoaiNguoiDung: value.state.name,
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
  update(data: any): void {
    this.user = {
      taiKhoan : data.getAttribute('data-account'),
      matKhau: data.getAttribute('data-password'),
      email: data.getAttribute('data-email'),
      soDt: data.getAttribute('data-phone'),
      maLoaiNguoiDung: data.getAttribute('data-maLoaiNguoiDung'),
      maNhom: 'GP09',
      hoTen: data.getAttribute('data-hoTen'),
    }


  }
  updateSubmit(form: any): void {
    const { value } = form;
    const update = {
      taiKhoan: value.account,
      matKhau: value.password,
      email: value.email,
      soDt: value.phone,
      maNhom: 'GP09',
      maLoaiNguoiDung: this.user.maLoaiNguoiDung,
      hoTen: value.name,
    };
    this.accountService.updateApi(update).subscribe((res) => {
      if (res) {
        alert('Thành công');
      }
    });
  }

  addUser(){
    for (let index in this.user) {
      this.user[index] = null;
    }
    this.user.maNhom = "GP09"
  }

  delete(user: any) {
    this.accountService.deleteUser(user).subscribe((res) => {
      console.log(res);
    });
  }
}
