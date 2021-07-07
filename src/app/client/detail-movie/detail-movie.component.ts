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
  loaiAction='LichChieu';
  heThongRap: any;
  maHeThongRap = 'BHDStar';
  maCTR = '';
  img = 'assets/images/bhd.jpg';
  CumRap: any;
  selectedIndex: number = 0;
  listNgay: any[] = [];
  constructor(
    private activatedRoute: ActivatedRoute,
    private movieSer: MovieService,
    private cinemasService: CinemasService,
    public datepipe: DatePipe
  ) {}

  ngOnInit(): void {
    this.id = this.activatedRoute.snapshot.paramMap.get('idMovie') as string;
    if (!this.id) {
      this.getParamsFromUrl();
    }
    this.getDataMovie(this.id);

    this.getDataMovieSchedule(this.id);

    this.getDay();
    this.displayDate();
    this.dayOnST = this.datepipe.transform(this.dayCur, 'dd-MM-yyyy');
    this.layLC(this.dayOnST);
    this.tabDisabled();
  }

  addDays(dateObj, numDays) {
    dateObj.setDate(dateObj.getDate() + numDays);
    return dateObj;
  }
  getListNgay() {
    for (let index = 0; index < 15; index++) {
      let now = new Date();
      let netxTWeek = this.addDays(now, index);

      this.listNgay.push(netxTWeek);
    }
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

      let trailer = this.detailMovie.trailer;
      this.url = trailer;
      this.point = res.danhGia;
    });
  }

  getDataMovieSchedule(idMovie: string) {
    this.cinemasService
      .layThongtinLichChieuTheoPhim(idMovie)
      .subscribe((res) => {
        this.heThongRap = res.heThongRapChieu;

        this.getcumRapChieu(this.maHeThongRap, this.dayOnST);
      });
  }

  cumRapDangCoPhim: any;
  isPhim: boolean = false;
  getcumRapChieu(maHT: string, ngayChonLich: string) {
    for (let cr of this.heThongRap) {
      if (cr.maHeThongRap == this.maHeThongRap) {
        this.CumRap = cr.cumRapChieu;
      }
    }
    this.isPhim = false;
    this.cumRapDangCoPhim = this.CumRap.filter((cumRap) => {
      for (let CTR of cumRap.lichChieuPhim) {
        // console.log(CTR);
        const ngayChieu = this.dateFormat(CTR.ngayChieuGioChieu);
        if (ngayChieu === ngayChonLich) {
          this.isPhim = true;
          return cumRap;
        }
      }
    });
    // console.log(this.cumRapDangCoPhim);
  }

  defaultCR(maHeThong: string) {
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
  chooseAction(loai: string) {
    this.loaiAction = loai;
  }
  setIndex(index: number) {
    this.selectedIndex = index;
  }

  layThongTinRap(maCR: string) {
    this.maHeThongRap = maCR;
    this.getcumRapChieu(this.maHeThongRap, '01-01-2019');
    this.defaultCR(maCR);
    this.layLC(this.dayOnST);
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
    const ngayTest = this.dayOnST;
    if (this.timeSt > this.timeHienTai) {
      this.disabledT = false;
    } else {
      this.disabledT = true;
    }
    if (ngayChieu == ngayTest) {
      return true;
    }

    return false;
  }

  // xscasccsacsacsacsavsacsacsavasvsavasvdavsavsavsavsav
  dayOnWeek = [
    { stt: 1, name: 'Hai', value: 'Mon', id: 'Mon-tab' },
    { stt: 2, name: 'Ba', value: 'Tue', id: 'Tue-tab' },
    { stt: 3, name: 'Tư', value: 'Wed', id: 'Wed-tab' },
    { stt: 4, name: 'Năm', value: 'Thu', id: 'Thu-tab' },
    { stt: 5, name: 'Sáu', value: 'Fri', id: 'Fri-tab' },
    { stt: 6, name: 'Bảy', value: 'Sat', id: 'Sat-tab' },
    { stt: 7, name: 'CN', value: 'Sun', id: 'Sun-tab' },
  ];
  dayCur = new Date().toString();
  today: any;
  listMV = [];
  listTime = [];
  dmy: any;
  CR = [];
  curList = [];
  dayOnST: any;
  nstt: any;
  active = 'today-tab';

  indexDis: any;
  tabDisabled() {
    for (let day of this.dayOnWeek) {
      if (day.id === 'today-tab') {
        this.indexDis = day.stt;
      }
    }
  }
  getDay() {
    let date;
    date = this.dayCur;
    date = date.split(' ');
    this.today = date[0];
    this.dmy = this.datepipe.transform(this.dayCur, 'dd/MM/yyyy');
  }
  displayDate() {
    for (let day of this.dayOnWeek) {
      if (day.value === this.today) {
        day.id = 'today-tab';
        day.name = 'Hôm nay';
        day.value = 'today';
      }
    }
    for (let sd of this.dayOnWeek) {
      if (sd.value === 'today') {
        this.nstt = sd.stt;
      }
    }
  }
  // lấy số thứ tự của thẻ đang chọn
  getListOnDay(index: number) {
    let day = this.dmy.split('/');
    let dd = day[0];
    let mm = day[1];
    let yyyy = day[2];

    var today = new Date();
    var lastDayOfMonth = new Date(
      today.getFullYear(),
      today.getMonth() + 1,
      0
    ).toString();

    let datString = lastDayOfMonth.split(' ');
    let maxDay = parseInt(datString[2]);

    let newDay = parseInt(dd) - (parseInt(this.nstt) - index);

    let newMonth = mm;
    let newYear = yyyy;

    if (newDay > maxDay) {
      let temp = newDay - maxDay;
      newDay = temp;
      newMonth = newMonth + 1;
    }
    if (newMonth > 12) {
      newMonth = 1;
      newYear = newYear + 1;
    }

    let fullDate =
      ('0' + newDay).slice(-2) +
      '-' +
      ('0' + newMonth).slice(-2) +
      '-' +
      newYear;
    this.dayOnST = fullDate;

    this.layLC(fullDate);
  }

  // cần
  layLC(day: any) {
    this.cinemasService
      .layThongtinLichChieuTheoPhim(this.id)
      .subscribe((res) => {
        this.heThongRap = res.heThongRapChieu;
        this.getcumRapChieu(this.maHeThongRap, day);
      });
  }
  getIdDay(id) {
    this.active = id;
  }



}
