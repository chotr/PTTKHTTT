import { map, filter } from 'rxjs/operators';
import { CinemasService } from 'src/app/client/services/cinemas.service';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MovieService } from '../services/movie.service';
import { DatePipe } from '@angular/common';
@Component({
  selector: 'app-detail-movie',
  templateUrl: './detail-movie.component.html',
  styleUrls: ['./detail-movie.component.scss'],
})
export class DetailMovieComponent implements OnInit {
  @ViewChild('iframe') iframe: ElementRef;
  url: string = '';

  detailMovie: any;
  id: string | null | undefined;

  point: any;
  loaiAction: string = "LichChieu";
  heThongRap: any;
  maHeThongRap ="BHDStar";
  maCTR = "";
  img ="assets/images/bhd.jpg";
  CumRap: any;
  selectedIndex: number = 0;
  listNgay: any[] = [];
  constructor(
    private activatedRoute: ActivatedRoute,
    private movieSer: MovieService,
    private cinemasService: CinemasService,
    public datepipe: DatePipe,
  ) {}

  ngOnInit(): void {
    this.id = this.activatedRoute.snapshot.paramMap.get('idMovie') as string;
    if (!this.id) {
      this.getParamsFromUrl();
    }
    this.getDataMovie(this.id);

    this.getDataMovieSchedule(this.id);

      this.getListNgay();
  }

  addDays(dateObj, numDays) {
    dateObj.setDate(dateObj.getDate()+ numDays);
    return dateObj;
  }
  getListNgay(){
    // let now = new Date();
    // let netxTWeek = this.addDays(now, 2);
    // console.log(netxTWeek);
      for (let index = 0; index < 15; index++) {
        let now = new Date();
        let netxTWeek = this.addDays(now, index);
        console.log(netxTWeek);
          this.listNgay.push(netxTWeek);
      }
      console.log(this.listNgay);
  }
  getParamsFromUrl() {
    this.activatedRoute.queryParams.subscribe((res) => {
      if (res) {
        this.detailMovie = res.maPhim;

      }
    });
  }
  getDataMovie(idMovie: string) {
    this.movieSer.getDetailMovie(idMovie).subscribe((res) => {
      if (res) {
        this.hideloader();
      }
      this.detailMovie = res;
      // console.log(this.detailMovie);
      let trailer = this.detailMovie.trailer;
      this.url = trailer;
      this.point = res.danhGia
    });
  }
  getDataMovieSchedule(idMovie: string) {
    this.cinemasService.layThongtinLichChieuTheoPhim(idMovie).subscribe((res) => {
      // console.log(res);
      this.heThongRap = res.heThongRapChieu;
      // console.log(this.heThongRap);
      this.getcumRapChieu(this.maHeThongRap, "01-01-2019");
    })

  }


  cumRapDangCoPhim: any;
  isPhim: boolean = false;
  getcumRapChieu(maHT: string, ngayChonLich: string) {

      console.log(this.heThongRap);
      for(let cr of this.heThongRap){
        if(cr.maHeThongRap == this.maHeThongRap) {
          this.CumRap = cr.cumRapChieu ;
          console.log(this.CumRap);

        }
      }
      this.isPhim = false;
      this.cumRapDangCoPhim = this.CumRap.filter((cumRap) => {
        // console.log(cumRap)
          for(let CTR of cumRap.lichChieuPhim) {
            // console.log(cl.ngayChieuGioChieu);
            const ngayChieu = this.dateFormat(CTR.ngayChieuGioChieu);
            if(ngayChieu == ngayChonLich) {
              console.log(ngayChieu);
              console.log(cumRap);
              this.isPhim = true;
              return cumRap;
            }
          }
      })

      console.log(this.cumRapDangCoPhim);

  }

  defaultCR(maHeThong:string) {
    switch (maHeThong) {
      case 'BHDStar':
        // this.maCTR = 'BHD Star Cineplex - 3/2';
        this.img = 'assets/images/bhd.jpg';
        break;
      case 'CGV':
        // this.maCTR = 'cgv-aeon-binh-tan';
        this.img = 'assets/images/cgv.jpg';
        break;
      case 'CineStar':
        // this.maCTR = 'cns-hai-ba-trung';
        this.img = 'assets/images/CineStar.jpg';
        break;
      case 'Galaxy':
        // this.maCTR = 'glx-huynh-tan-phat';
        this.img = 'assets/images/glx.jpg';
        break;
      case 'LotteCinima':
        // this.maCTR = 'lotte-cantavil';
        this.img = 'assets/images/lotte.jpg';
        break;
      case 'MegaGS':
        // this.maCTR = 'megags-cao-thang';
        this.img = 'assets/images/megac.jpg';
        break;
    }
  }

  dateFormat(value: any): string {
    let date1 = new Date(value);
    let latest_date = this.datepipe.transform(date1, 'dd-MM-yyyy');
    return latest_date;
  }
  timeEndFormat(value: any): string {
    const date = new Date(value);
    let time = this.datepipe.transform(date, 'HH:mm');
    const hours = ('0' + (date.getHours() + 2)).slice(-2);
    const minutes = ('0' + date.getMinutes()).slice(-2);
    const timeEnd = hours + ':' + minutes;
    return timeEnd;
  }
  hideloader() {
    document.getElementById('spinner').style.display = 'none';
    document.getElementById('content').style.display = 'block';
  }
  chooseAction(loai: string){
    this.loaiAction = loai;
  }
  setIndex(index: number) {
    this.selectedIndex = index;
  }

  layThongTinRap(maCR: string){
    this.maHeThongRap = maCR;
    console.log(this.maHeThongRap)
    this.getcumRapChieu(this.maHeThongRap, "01-01-2019");
    this.defaultCR(maCR);
  }

  date = new Date();
  timeSt: any;
  timeHienTai: any;
  disabledT: boolean = true;
  kiemTraNgayChieu(value: any): boolean {
    const ngayChieu = this.dateFormat(value);
    const date = new Date(value);
    this.timeSt = this.datepipe.transform(date, 'HH');
    this.timeHienTai = this.date.getHours();

    // const ngayHienTai = this.dateFormat(this.today); //so sanh vs ngay hienTai
    const ngayTest = "01-01-2019";
    if(this.timeSt  > this.timeHienTai ){
      this.disabledT = false;
    }
    else {
      this.disabledT = true;
    }
    if (ngayChieu == ngayTest) {
      return true;
    }

    return false;
  }

}
