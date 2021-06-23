import { catchError, tap } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CinemasService {

  constructor(private httpClient: HttpClient) { }

  getCinemaInfor(): Observable<any> {
    const apiHTR =
      'https://movie0706.cybersoft.edu.vn/api/QuanLyRap/LayThongTinHeThongRap';
    return this.httpClient.get(apiHTR).pipe(
      tap(res => res),
      catchError((error) => {
        return this.handleErr(error);
      })
    );
  }

  getCinemaComplex(idHTR: string): Observable<any> {
    const apiCRP =
      'https://movie0706.cybersoft.edu.vn/api/QuanLyRap/LayThongTinCumRapTheoHeThong?maHeThongRap='+ idHTR;
    return this.httpClient.get(apiCRP).pipe(
      tap(res => res),
      catchError((error) => {
        return this.handleErr(error);
      })
    );
  }
  layThongtinHeThongLichChieu(idHTR: string): Observable<any> {
    const apiCRP =
      `https://movie0706.cybersoft.edu.vn/api/QuanLyRap/LayThongTinLichChieuHeThongRap?maHeThongRap=${idHTR}&maNhom=GP09`;
    return this.httpClient.get(apiCRP).pipe(
      tap(res => res),
      catchError((error) => {
        return this.handleErr(error);
      })
    );
  }
  layThongtinLichChieu(idPhim: string): Observable<any> {
    const apiLichChieu =
      `https://movie0706.cybersoft.edu.vn/api/QuanLyRap/LayThongTinLichChieuPhim?MaPhim=`+ idPhim;
    return this.httpClient.get(apiLichChieu).pipe(
      tap(res => res),
      catchError((error) => {
        return this.handleErr(error);
      })
    );
  }
  showtime(data): Observable<any> {
    const api =
      'https://movie0706.cybersoft.edu.vn/api/QuanLyDatVe/TaoLichChieu';
    return this.httpClient.post(api, data, { responseType: 'text' }).pipe(
      tap(),
      catchError((err) => {
        return this.handleErr(err);
      })
    );
  }
 getDetailSeat(id: any): Observable<any>{
   const api = 'https://movie0706.cybersoft.edu.vn/api/QuanLyDatVe/LayDanhSachPhongVe?MaLichChieu=' + id;
   return this.httpClient.get(api).pipe(
    tap(),
    catchError((err) => {
      return this.handleErr(err);
    })
  );
 }


  handleErr(error: any) {
    switch (error.status) {
      case 500: {
        alert(error.error);
        break;
      }
    }
    return throwError(error);
  }


}


