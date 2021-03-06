import { CinemasService } from './../services/cinemas.service';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { DatePipe } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-cinemas',
  templateUrl: './cinemas.component.html',
  styleUrls: ['./cinemas.component.scss'],
})
export class CinemasComponent implements OnInit {
  listMovie: any[] = [];
  listCinema: any[] = [];
  listCRP: any[] = [];

  listCinemaArr = [];
  maHeThongRap: any;

  listCumRap: any;
  listPhim = [];
  listLichChieu: any;
  gioChieu: any;
  maCumRapPhim = 'BHDStar';
  arrAbc = [];
  maCTR = 'BHD Star Cineplex - 3/2';
  img = 'assets/images/bhd.jpg';
  //
  date = new Date();
  listNgayChieuPhimHienTai: any[] = [];
  ngayChieuPhim: any;
  // ngayHienTai =  this.today.getDate()+'-'+(this.today.getMonth()+1)+'-'+this.today.getFullYear();
  ngayHienTai = this.dateFormat(this.date);
  isPhim = false;
  phimHT: any;
  listPhimNgayHienTai: any[] = [];
  selectedIndex: number = 0;
  selectedIndex2: number = 0;


  @Output() newItem = new EventEmitter<string>();

  constructor(
    private cinemaSer: CinemasService,
    public datepipe: DatePipe,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.cinemaSer.getCinemaInfor().subscribe((res) => {
      this.listCinema = res;
      this.maHeThongRap = res.maHeThongRap;
    });
    this.getInfoShowTimes();
    this.getThongTinCumRam();
  }

  getThongTinCumRam() {
    this.defaultCR();
    this.cinemaSer.getCinemaComplex(this.maCumRapPhim).subscribe((resu) => {
      this.listCRP = resu;
    });
  }

  getInfoShowTimes() {
    this.cinemaSer
      .layThongtinHeThongLichChieu(this.maCumRapPhim)
      .subscribe((res) => {
        this.listCumRap = res[0].lstCumRap;
        for (let item of this.listCumRap) {
          if (item.maCumRap == this.maCTR) {
            //bhd-star-cineplex-3-2
            this.listPhim = item.danhSachPhim;
          }
        }
        this.layDSPhimDC();


      });
  }
  layDSPhimDC() {

    let flag = false;
    this.listPhimNgayHienTai = this.listPhim.filter((phim) => {
      for (let lichChieu of phim.lstLichChieuTheoPhim) {
        console.log(lichChieu);
        const ngayChieu = this.dateFormat(lichChieu.ngayChieuGioChieu);
        if (ngayChieu == '01-01-2019') {
          // 21-05-2020 // === this.ngayHienTai so sanh vs ngay hienTai
          flag = true;
          return phim;
        }
      }

      this.isPhim = flag;

    });
  }

  timeSt: any;
  timeHienTai: any;
  disabledT: boolean = true;
  kiemTraNgayChieu(value: any): boolean {
    const ngayChieu = this.dateFormat(value);
    const date = new Date(value);
    this.timeSt = this.datepipe.transform(date, 'HH');
    this.timeHienTai = this.date.getHours();

    // const ngayHienTai = this.dateFormat(this.today); //so sanh vs ngay hienTai
    const ngayTest = '01-01-2019';
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
    // let time  = this.datepipe.transform(timeEnd, 'HH:mm');
    return timeEnd;
  }

  defaultCR() {
    switch (this.maCumRapPhim) {
      case 'BHDStar':
        this.maCTR = 'BHD Star Cineplex - 3/2';
        this.img = 'assets/images/bhd.jpg';
        break;
      case 'CGV':
        this.maCTR = 'cgv-aeon-binh-tan';
        this.img = 'assets/images/cgv.jpg';
        break;
      case 'CineStar':
        this.maCTR = 'cns-hai-ba-trung';
        this.img = 'assets/images/CineStar.jpg';
        break;
      case 'Galaxy':
        this.maCTR = 'glx-huynh-tan-phat';
        this.img = 'assets/images/glx.jpg';
        break;
      case 'LotteCinima':
        this.maCTR = 'lotte-cantavil';
        this.img = 'assets/images/lotte.jpg';
        break;
      case 'MegaGS':
        this.maCTR = 'megags-cao-thang';
        this.img = 'assets/images/megac.jpg';
        break;
    }
  }
  layThongTinRap(item: any) {
    this.maCumRapPhim = item;
    this.getThongTinCumRam();
    this.getInfoShowTimes();
  }
  layLichChieu(maCumRap) {
    this.maCTR = maCumRap;
    this.getInfoShowTimes();
  }
  setIndex(index: number) {
    this.selectedIndex = index;
    this.selectedIndex2 = 0;
  }
  setIndex2(index: number) {
    this.selectedIndex2 = index;
  }

  navigateTo(id) {
    this.router.navigate(['client/danhSachGhe', id]);
  }
  navigateToCR(id) {
    this.router.navigate(['client/detail', this.maCumRapPhim + '?maCR=' + id]);
    console.log(this.maCumRapPhim);
  }
}
