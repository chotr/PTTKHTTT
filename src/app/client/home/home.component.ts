import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { CinemasService } from '../services/cinemas.service';
import { MovieService } from '../services/movie.service';
import { OwlOptions } from 'ngx-owl-carousel-o';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  @ViewChild('carouselSlide') carouselSlide: any;
  listMovie: any[] = [];
  dsRap: any[] = [];
  dsCR: any[] = [];
  dsLC: any[] = [];
  maPhim: any;
  maHT: any;
  maLC: any;
  disabledT = false;
  tenPhim = 'Chọn phim ...';
  tenRap = 'Chọn rạp ...';
  cumRap = 'Chọn cụm rạp ...';
  lc = 'Chọn giờ chiếu ...';
  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    dots: false,
    navSpeed: 1000,
    navText: ['', ''],
    autoplayHoverPause: false,
    autoplay: true,
    autoplayTimeout: 6000,
    responsive: {
      0: {
        items: 1,
      },
      400: {
        items: 1,
      },
      740: {
        items: 1,
      },
      940: {
        items: 1,
      },
    },
    nav: false,
  };
  constructor(
    private router: Router,
    private moviesService: MovieService,
    private cinemaSer: CinemasService
  ) {}

  ngOnInit(): void {
    this.moviesService.getDataMovies().subscribe((res) => {
      if (res) {
        this.hideloader();
      }
      this.listMovie = res.slice(10, 20);
      // console.log(this.listMovie);
    });
  }
  getMaPhim(maPhim, tenPhim): void {
    this.tenRap = 'Chọn rạp ...';
    this.cumRap = 'Chọn cụm rạp ...';
    this.lc = 'Chọn giờ chiếu';
    this.dsRap = [];
    this.dsCR = [];
    this.maPhim = maPhim;
    this.tenPhim = tenPhim;
    let listTemp = [];
    this.cinemaSer.layThongtinLichChieuTheoPhim(maPhim).subscribe((res) => {
      if (res) {
        for (let heThong of res.heThongRapChieu) {
          listTemp.push({
            maHT: heThong.maHeThongRap,
            tenHeThongRap: heThong.tenHeThongRap,
          });
        }
      }
    });
    listTemp = this.dsRap;
  }
  getMaRap(maHT, tenHT): void {
    this.cumRap = 'Chọn cụm rạp ...';
    this.lc = 'Chọn giờ chiếu';
    this.tenRap = tenHT;
    this.maHT = maHT;
    let listTemp = [];
    this.cinemaSer
      .layThongtinLichChieuTheoPhim(this.maPhim)
      .subscribe((res) => {
        if (res) {
          for (let heThong of res.heThongRapChieu) {
            for (let cr of heThong.cumRapChieu) {
              if (heThong.maHeThongRap === this.maHT) {
                listTemp.push({
                  maCR: cr.maCumRap,
                  tenCR: cr.tenCumRap,
                });
              }
            }
          }
        }
      });
    this.dsCR = listTemp;
  }
  getMaCumRap(maCR, tenCR): void {
    this.lc = 'Chọn giờ chiếu';
    this.cumRap = tenCR;
    let listTemp = [];
    this.cinemaSer
      .layThongtinLichChieuTheoPhim(this.maPhim)
      .subscribe((res) => {
        if (res) {
          for (let heThong of res.heThongRapChieu) {
            for (let cr of heThong.cumRapChieu) {
              if (heThong.maHeThongRap === this.maHT) {
                if (maCR === cr.maCumRap) {
                  for (let lc of cr.lichChieuPhim) {
                    listTemp.push({
                      maLC: lc.maLichChieu,
                      ngayChieu: lc.ngayChieuGioChieu,
                    });
                  }
                }
              }
            }
          }
        }
      });

    listTemp = this.dsLC;
    console.log(this.dsLC);
  }
  getMaLC(maLC: any, ngayChieu): void {
    this.maLC = maLC;
    this.lc = ngayChieu
    if(this.maLC !== "Chọn giờ chiếu ..."){
      this.disabledT = true
    }
  }
  sbmDatVe() {
    this.router.navigate(['client/danhSachGhe', this.maLC]);
  }
  navigateTo() {
    this.router.navigate(['client/movies/Page']);
  }
  hideloader() {
    document.getElementById('spinner').style.display = 'none';
    document.getElementById('list_movie').style.display = 'block';
    document.getElementById('cinema').style.display = 'block';
  }
}
