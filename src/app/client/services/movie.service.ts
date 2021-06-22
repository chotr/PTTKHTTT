import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { tap, map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class MovieService {
  private data = new BehaviorSubject({});
  public movieModal = this.data.asObservable();
  public myArr: any[];

  constructor(private httpClient: HttpClient) {}

  getDataMovies(): Observable<ObjPhim[]> {
    const api =
      'https://movie0706.cybersoft.edu.vn/api/QuanLyPhim/LayDanhSachPhim?maNhom=GP09';
    return this.httpClient.get<ObjPhim[]>(api).pipe(
      map((res: ObjPhim[]) => {
        return res.map((item) => {
          item.tenPhim = item.tenPhim;
          return item;
        });
      })
    );
  }
  getDetailMovie(id: string): Observable<any> {
    const apiDetailMovie =
      'https://movie0706.cybersoft.edu.vn/api/QuanLyPhim/LayThongTinPhim?MaPhim=' +
      id;
    return this.httpClient.get(apiDetailMovie).pipe(
      tap(),
      catchError((error) => {
        return this.handleErr(error);
      })
    );
  }

  getMoviePagination(pageCurrent: any, numberItem: number): Observable<any> {
    const api =
      'https://movie0706.cybersoft.edu.vn/api/QuanLyPhim/LayDanhSachPhimPhanTrang?maNhom=GP09&soTrang=' +
      pageCurrent +
      '&soPhanTuTrenTrang=' +
      numberItem;
    return this.httpClient.get(api).pipe(
      tap(),
      catchError((error) => {
        return this.handleErr(error);
      })
    );
  }

  addMovie(data: any): Observable<any> {
    const api =
      'https://movie0706.cybersoft.edu.vn/api/QuanLyPhim/ThemPhimUploadHinh';
    return this.httpClient.post(api, data).pipe(
      tap(),
      catchError((err) => {
        return this.handleErr(err);
      })
    );
  }
  updateMovie(data: any): Observable<any> {
    const api =
      'https://movie0706.cybersoft.edu.vn/api/QuanLyPhim/CapNhatPhimUpload';
    return this.httpClient.post(api, data).pipe(
      tap(),
      catchError((err) => {
        return this.handleErr(err);
      })
    );
  }
  deleteMovie(data: any): Observable<any> {
    const api =
      'https://movie0706.cybersoft.edu.vn/api/QuanLyPhim/XoaPhim?MaPhim=' +
      data;
    return this.httpClient.delete(api, { responseType: 'text' }).pipe(
      tap(),
      catchError((err) => {
        return this.handleErr(err);
      })
    );
  }
  
  changeDataMovieModal(movie: any): void {
    this.data.next(movie);
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
export interface ObjPhim {
  maPhim: number;
  tenPhim: string;
  biDanh: string;
  trailer: string;
  hinhAnh: string;
  moTa: string;
  maNhom: 'GP09';
  ngayKhoiChieu: string;
  danhGia: number;
}
// export interface Obj {
//   currentPage: number;
//   count: number;
//   totalPages: number;
//   totalCount: number;
//   items: ObjPhim[];
// }
