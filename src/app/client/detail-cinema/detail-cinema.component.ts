import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { CinemasService } from '../services/cinemas.service';

@Component({
  selector: 'app-detail-cinema',
  templateUrl: './detail-cinema.component.html',
  styleUrls: ['./detail-cinema.component.scss'],
})
export class DetailCinemaComponent implements OnInit {
  url: any;
  maHeThong: any;
  maCR: any;
  nameCR: any;
  img: any;
  diaChi: any;
  loaiAction = 'LichChieu';
  listCR = [];
  dayCur = new Date().toString();
  today: any;
  listTime = [];
  dmy: any;
  CR = [];
  curList = [];
  dayOnST: any;
  nstt: any;
  active = 'today-tab';
  indexDis: any;
  listMovie = [];

  dayOnWeek = [
    { stt: 1, name: 'Hai', value: 'Mon', id: 'Mon-tab' },
    { stt: 2, name: 'Ba', value: 'Tue', id: 'Tue-tab' },
    { stt: 3, name: 'Tư', value: 'Wed', id: 'Wed-tab' },
    { stt: 4, name: 'Năm', value: 'Thu', id: 'Thu-tab' },
    { stt: 5, name: 'Sáu', value: 'Fri', id: 'Fri-tab' },
    { stt: 6, name: 'Bảy', value: 'Sat', id: 'Sat-tab' },
    { stt: 7, name: 'CN', value: 'Sun', id: 'Sun-tab' },
  ];

  constructor(
    private activatedRoute: ActivatedRoute,
    private cinema: CinemasService,
    private router: Router,
    private datepipe: DatePipe
  ) {}

  ngOnInit(): void {
    this.url = this.activatedRoute.snapshot.paramMap.get('id') as string;
    let getUrl = this.url.split('?maCR=');
    this.maHeThong = getUrl[0];
    this.maCR = getUrl[1];
    this.dayOnST = this.datepipe.transform(this.dayCur, 'dd-MM-yyyy');
    this.dsCumRap(this.maHeThong);
    this.getCR(this.maHeThong);
    this.defaultCR();
    this.getShowTimesCinema(this.maHeThong);
    this.getDay();
    this.displayDate();
    this.tabDisabled();

    this.router.events.subscribe((evt) => {
      if (!(evt instanceof NavigationEnd)) {
        return;
      }
      window.scrollTo(0, 0);
    });
  }

  dsCumRap(maht) {
    this.cinema.getCinemaComplex(maht).subscribe((res) => {
      if (res) {
        this.hideloader();
      }
      for (let i of res) {
        if (i.maCumRap === this.maCR) {
          this.nameCR = i.tenCumRap;
          this.diaChi = i.diaChi;
        }
      }
    });
  }
  getCR(id) {
    this.cinema.layThongtinHeThongLichChieu(id).subscribe((res) => {
      for (let list of res) {
        for (let lstCR of list.lstCumRap) {
          this.listCR.push(lstCR);
        }
      }
    });
  }

  getShowTimesCinema(id) {
    let arrayMv = [];
    this.cinema.layThongtinHeThongLichChieu(id).subscribe((res) => {
      for (let list of res) {
        for (let lstCR of list.lstCumRap) {
          if (lstCR.maCumRap === this.maCR) {
            for (let ds of lstCR.danhSachPhim) {
              for (let lc of ds.lstLichChieuTheoPhim) {
                if (
                  this.datepipe.transform(
                    lc.ngayChieuGioChieu,
                    'dd-MM-yyyy'
                  ) === this.dayOnST
                ) {
                  arrayMv.push({
                    name: ds.tenPhim,
                    maLichChieu: lc.maLichChieu,
                    hinhAnh: ds.hinhAnh,
                    date: lc.ngayChieuGioChieu,
                  });
                }
              }
            }
          }
        }
      }
      this.listMovie = arrayMv;
      console.log(this.listMovie);
    });
  }
  defaultCR() {
    switch (this.maHeThong) {
      case 'BHDStar':
        this.img = 'assets/images/bhd.jpg';
        break;
      case 'CGV':
        this.img = 'assets/images/cgv.jpg';
        break;
      case 'CineStar':
        this.img = 'assets/images/CineStar.jpg';
        break;
      case 'Galaxy':
        this.img = 'assets/images/glx.jpg';
        break;
      case 'LotteCinima':
        this.img = 'assets/images/lotte.jpg';
        break;
      case 'MegaGS':
        this.img = 'assets/images/megac.jpg';
        break;
    }
  }
  hideloader() {
    document.getElementById('spinner').style.display = 'none';
    document.getElementById('content').style.display = 'block';
  }
  chooseAction(loai: string) {
    this.loaiAction = loai;
  }
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
  getListOnDay(index) {
    let day = this.dmy.split('/');
    console.log(day);
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
    this.getShowTimesCinema(this.maHeThong);
  }
  getIdDay(id) {
    this.active = id;
  }

  navigateTo(id) {
    this.router.navigate(['client/danhSachGhe', id]);
  }
}
