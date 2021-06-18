import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

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
    const api = ' https://movie0706.cybersoft.edu.vn/api/QuanLyNguoiDung/XoaNguoiDung';
    return this.httpClient.delete(api, data).pipe(
      tap(),
      catchError((err) => {
        return this.handleError(err);
      })
    );
  }

  handleError(error: any) {
    switch (error.status) {
      case 500:
        alert(error.error);
        break;
    }
    return throwError(error);
  }
}
