import { Component, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AccountService } from 'src/app/provider/services/account.service';

@Component({
  selector: 'app-user-management',
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.scss'],
})
export class UserManagementComponent implements OnInit {
  @ViewChild('signUpForm') signUpFormTag: any;

  states = [
    {name: 'KhachHang', abbrev: 'Khách hàng'},
    {name: 'QuanTri', abbrev: 'Quản trị'},
  ];

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
    this.getDataMovie(this.pageCurrent);
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
  getDataMovie(page: any) {
    this.accountService.listUser(page, this.numPerPage).subscribe((res) => {
      if (res) {
        this.pageCurrent = res.currentPage;
        this.total = res.totalCount;
        this.users = res.items;
        console.log(this.users);

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
  
  update(data){
    let taiKhoan = data.getAttribute('data-account')
    let hoTen = data.getAttribute('data-hoTen')
    let email = data.getAttribute('data-email')
    let soDt = data.getAttribute('data-phone')
    let maLoaiNguoiDung = data.getAttribute('data-maLoaiNguoiDung')
    this.signUpFormTag.setValue({
      taiKhoan: taiKhoan,
      email: email,
      soDt: soDt,
      maLoaiNguoiDung:maLoaiNguoiDung,
      hoTen: hoTen,

    })
    // console.log(this.signUpFormTag.value)



  }
}
