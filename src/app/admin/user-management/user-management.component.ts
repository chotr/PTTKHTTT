import {
  AfterViewInit,
  Component,
  OnInit,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { AccountService } from 'src/app/provider/services/account.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-user-management',
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.scss'],
})
export class UserManagementComponent implements OnInit, AfterViewInit {
  @ViewChild('signUpForm') signUpFormTag: NgForm;
  @ViewChild('updateForm') updateForm: any;

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
  selectedIndex: number;
  public routerLinkVariable = '/admin/user-management';

  states = [
    { name: 'KhachHang', abbrev: 'KhachHang' },
    { name: 'QuanTri', abbrev: 'QuanTri' },
  ];

  regexEmail =
    '/^(([^<>()[].,;:s@"]+(.[^<>()[].,;:s@"]+)*)|(".+"))@(([^<>()[].,;:s@"]+.)+[^<>()[].,;:s@"]{2,})$/i';

  user = {
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
  // getSelect(evt: any) {
  //   this.user.maLoaiNguoiDung = evt
  // }
  // getForm(evt: any){
  //   this.user = evt
  // }
  signUp(form: any): void {
    const { value } = form;
    const signUp = {
      taiKhoan: value.account,
      matKhau: value.password,
      email: value.email,
      soDt: value.phone,
      maNhom: 'GP09',
      maLoaiNguoiDung: value.maLoaiNguoiDung,
      hoTen: value.name,
    };
    this.accountService.addUsser(signUp).subscribe((res) => {
      if (res) {
        Swal.fire({
          title: 'Thông báo',
          text: 'Đặt vé thành công!',
          icon: 'success',
          showCancelButton: false,
          confirmButtonText: 'Xác nhận!',
        }).then((result) => {
          if (result.isConfirmed) {
            this.signUpFormTag.reset();
            this.getDataUser(this.pageCurrent);
          }
        });
      }
    });
  }

  ngAfterViewInit(): void {
    // console.log(this.signUpFormTag);
  }
  update(data: any): void {
    // this.isDisabled = true
    this.user = {
      taiKhoan: data.getAttribute('data-account'),
      matKhau: data.getAttribute('data-password'),
      email: data.getAttribute('data-email'),
      soDt: data.getAttribute('data-phone'),
      maLoaiNguoiDung: data.getAttribute('data-maLoaiNguoiDung'),
      maNhom: 'GP09',
      hoTen: data.getAttribute('data-hoTen'),
    };
  }
  updateSubmit(form: any): void {
    const { value } = form;
    const update = {
      taiKhoan: value.account,
      matKhau: value.password,
      email: value.email,
      soDt: value.phone,
      maNhom: 'GP09',
      maLoaiNguoiDung: value.maLoaiNguoiDung,
      hoTen: value.name,
    };
    this.accountService.updateApi(update).subscribe((res) => {
      if (res) {
        Swal.fire({
          title: 'Thông báo',
          text: 'Cập nhật thành công!',
          icon: 'success',
          showCancelButton: false,
          confirmButtonText: 'Xác nhận!',
        }).then((result) => {
          if (result.isConfirmed) {
            this.getDataUser(this.pageCurrent);
          }
        });
      }
    });
  }

  addUser() {
    for (let index in this.signUpFormTag) {
      this.user[index] = null;
    }
    this.user.maNhom = 'GP09';
  }

  deleteUser(user: any) {
    this.accountService.deleteUser(user).subscribe((res) => {
      if (res) {
        Swal.fire({
          title: 'Thông báo',
          text: 'Xóa thành công!',
          icon: 'success',
          showCancelButton: false,
          confirmButtonText: 'Xác nhận!',
        }).then((result) => {
          if (result.isConfirmed) {
            this.getDataUser(this.pageCurrent);
          }
        });
      }
    });
  }
  navigateTo(p: any) {
    this.router.navigate(['admin/user-management', p]);
    this.accountService.listUser(p, this.numPerPage).subscribe((res) => {
      if (res) {
        this.users = res.items;
      }
    });
  }
  navigateToPrev() {
    const abc = this.activatedRoute.snapshot.paramMap.get('page') as string;
    const url = parseInt(abc) - 1;

    if (parseInt(abc) > 1) {
      this.router.navigate(['admin/user-management', url]);
      this.accountService.listUser(url, this.numPerPage).subscribe((res) => {
        if (res) {
          this.users = res.items;
          this.selectedIndex = res.currentPage;
        }
      });
    }
  }
  navigateToNext() {
    const abc = this.activatedRoute.snapshot.paramMap.get('page') as string;
    const url = parseInt(abc) + 1;

    if (parseInt(abc) < this.totalPage) {
      this.router.navigate(['admin/user-management', url]);
      this.accountService.listUser(url, this.numPerPage).subscribe((res) => {
        if (res) {
          this.users = res.items;
          this.selectedIndex = res.currentPage;
        }
      });
    }
  }
  setIndex(index: number) {
    this.accountService.listUser(index, this.numPerPage).subscribe((res) => {
      if (res) {
        this.selectedIndex = res.currentPage;
      }
    });

    this.router.events.subscribe((evt) => {
      if (!(evt instanceof NavigationEnd)) {
        return;
      }
      window.scrollTo(0, 0);
    });
  }
}
