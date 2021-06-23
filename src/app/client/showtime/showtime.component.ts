import { DatePipe } from '@angular/common';
import {
  AfterViewInit,
  Component,
  EventEmitter,
  OnInit,
  Output,
  resolveForwardRef,
} from '@angular/core';
import { CinemasService } from '../services/cinemas.service';

@Component({
  selector: 'app-showtime',
  templateUrl: './showtime.component.html',
  styleUrls: ['./showtime.component.scss'],
})
export class ShowtimeComponent implements OnInit, AfterViewInit {
  arrheThongRap = [];
  maHeThongRap = 'BHDStar';
  arrCumRap = [];
  cumRap = 'BHD Star Cineplex - 3/2';
  listPhim = [];
  hinhAnh =
    'https://cdn.alongwalker.net/master_media/uploads/2021/01/12042611/galaxy-da-nang-gia-ve-review-rap-chieu-phim-hien-dai-danh-cho-gioi-tre-16104255687319.jpg';

  constructor(private cinemaSer: CinemasService, public datepipe: DatePipe) {}

  ngOnInit(): void {
    let objectimg = [
      {
        img: 'https://cdn.alongwalker.net/master_media/uploads/2021/01/12042611/galaxy-da-nang-gia-ve-review-rap-chieu-phim-hien-dai-danh-cho-gioi-tre-16104255687319.jpg',
      },
      {
        img: 'https://info-imgs.vgcloud.vn/2020/05/09/22/rap-chieu-phim-mo-cua-tro-lai-voi-khuyen-mai-soc-nhung-van-vang-hiu-3.jpg',
      },
      {
        img: 'https://afamilycdn.com/150157425591193600/2021/5/4/batch70eb29557732826cdb2318-16201401042561018656523.jpg',
      },
    ];
    this.getInfoCinemas();
  }
  ngAfterViewInit(): void {
    this.getCinemaComplex();
    this.getPhim();
  }

  getInfoCinemas() {
    this.cinemaSer.getCinemaInfor().subscribe((res) => {
      this.arrheThongRap = res;
    });
  }
  getCinema(evt) {
    this.maHeThongRap = evt;
    this.cinemaSer.getCinemaComplex(this.maHeThongRap).subscribe((res) => {
      this.arrCumRap = res;
    });
  }
  getCinemaComplex() {
    this.cinemaSer.getCinemaComplex(this.maHeThongRap).subscribe((res) => {
      this.arrCumRap = res;
    });
  }
  getcumRap(evt) {
    this.cumRap = evt;
    this.cinemaSer
      .layThongtinHeThongLichChieu(this.maHeThongRap)
      .subscribe((res) => {
        // console.log(res)
      });
      this.getPhim()
  }
  getPhim() {
    let movie = [];
    this.cinemaSer
      .layThongtinHeThongLichChieu(this.maHeThongRap)
      .subscribe((res) => {
        for (let heThong of res) {
          console.log(heThong)
          for (let cumRap of heThong.lstCumRap) {
              console.log(cumRap.maCumRap)
              this.listPhim = cumRap.danhSachPhim
            if (this.cumRap == cumRap.maCumRap) {
              for (let phim of cumRap.danhSachPhim);
            }
          }
        }
        // console.log(this.listPhim);
      });
  }
}
