import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root',
})
export class AccountService {
  constructor(private httpClient: HttpClient) {}

  loginApi(data: any): Observable<any> {
    const api =
      'https://movie0706.cybersoft.edu.vn/api/QuanLyNguoiDung/DangNhap';
    return this.httpClient.post(api, data).pipe(
      tap(),
      catchError((err) => {
        return this.handleError(err);
      })
    );
  }
  signUpApi(data: any): Observable<any> {
    const api = 'https://movie0706.cybersoft.edu.vn/api/QuanLyNguoiDung/DangKy';
    return this.httpClient.post(api, data).pipe(
      tap(),
      catchError((err) => {
        return this.handleError(err);
      })
    );
  }
  updateApi(data: any): Observable<any> {
    const api =
      'https://movie0706.cybersoft.edu.vn/api/QuanLyNguoiDung/CapNhatThongTinNguoiDung';
    return this.httpClient.put(api, data).pipe(
      tap(),
      catchError((err) => {
        return this.handleError(err);
      })
    );
  }
  listUserFull() : Observable<any> {
    const api = 'https://movie0706.cybersoft.edu.vn/api/QuanLyNguoiDung/LayDanhSachNguoiDung?MaNhom=GP09';
    return this.httpClient.get(api).pipe(
      tap(),
      catchError((err) => {
        return this.handleError(err);
      })
    );
  }
  listUser(page: any, numPerPage: any): Observable<any> {
    const api =
      'https://movie0706.cybersoft.edu.vn/api/QuanLyNguoiDung/LayDanhSachNguoiDungPhanTrang?MaNhom=GP09&soTrang=' +
      page +
      '&soPhanTuTrenTrang=' +
      numPerPage;
    return this.httpClient.get(api).pipe(
      tap(),
      catchError((err) => {
        return this.handleError(err);
      })
    );
  }

  addUsser(data: any): Observable<any> {
    const api = 'https://movie0706.cybersoft.edu.vn/api/QuanLyNguoiDung/ThemNguoiDung';
    let header = {'Content-Type':'application/json;charset=UTF-8'};
    // header.append('Content-Type', 'application/json;charset=UTF-8');
    return this.httpClient.post(api, data).pipe(
      tap(),
      catchError((err) => {
        return this.handleError(err);
      })
    );
  }
 
  deleteUser(data: any): Observable<any> {
    const api = ' https://movie0706.cybersoft.edu.vn/api/QuanLyNguoiDung/XoaNguoiDung?TaiKhoan=' + data;
    return this.httpClient.delete(api,{responseType: 'text'}).pipe(
      tap(),
      catchError((err) => {
        return this.handleError(err);
      })
    );
    
  }
  detailUser(data: any): Observable<any> {
    const api = ' https://movie0706.cybersoft.edu.vn/api/QuanLyNguoiDung/ThongTinTaiKhoan';
    return this.httpClient.post(api, data).pipe(
      tap(),
      catchError((err) => {
        return this.handleError(err);
      })
    );
    
  }

  handleError(error: any) {
    switch (error.status) {
      case 500:
        Swal.fire({
          title: 'Thông báo',
          text: error.error,
          icon: 'error',
          showCancelButton: false,
          confirmButtonText: 'Xác nhận!',
        }).then((result) => {
          if (result.isConfirmed) {
          }
        });
        break;
    }
    return throwError(error);
  }
}
