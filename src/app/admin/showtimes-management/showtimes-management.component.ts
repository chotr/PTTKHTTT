import { AfterViewInit } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { CinemasService } from 'src/app/client/services/cinemas.service';
import { MovieService } from 'src/app/client/services/movie.service';

@Component({
  selector: 'app-showtimes-management',
  templateUrl: './showtimes-management.component.html',
  styleUrls: ['./showtimes-management.component.scss'],
})
export class ShowtimesManagementComponent implements OnInit, AfterViewInit {
  maHeThongRap = [];
  selectedmaHeThong: any;
  cumRap = [];
  selectedCumRap: any;
  maRap = [];
  selectedMaRap: any;
  dsPhim = [];
  selectedPhim: any;

  dateShow:''
  price:0
  time:''


  constructor(
    private cinemaSer: CinemasService,
    private movieService: MovieService
  ) {}

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    this.getNameCinema();
    this.getMovie();
  }
  getMovie() {
    this.movieService.getDataMovies().subscribe((data) => {
      for (let phim of data) {
        this.dsPhim.push({
          value: phim.maPhim,
          name: phim.tenPhim,
          image: phim.hinhAnh,
        });
      }
    });
  }
  getst(evt) {
    console.log(evt);
  }
  getNameCinema() {
    this.cinemaSer.getCinemaInfor().subscribe((res) => {
      for (let ma of res) {
        this.maHeThongRap.push({ name: ma.maHeThongRap });
      }
    });
  }
  mySelectHandler(evt) {
    let btam = [];
    this.cinemaSer.getCinemaComplex(evt).subscribe((res) => {
      for (let ma of res) {
        btam.push({ value: ma.maCumRap, name: ma.tenCumRap });
      }
      this.cumRap = btam;
    });
  }
  selectMaRap() {
    let getRap = [];
    this.cinemaSer.getCinemaComplex(this.selectedmaHeThong).subscribe((res) => {
      for (let ma of res) {
        if (ma.maCumRap === this.selectedCumRap) {
          for (let rap of ma.danhSachRap) {
            getRap.push({ value: rap.maRap, name: rap.tenRap });
          }
        }
      }
      this.maRap = getRap;
    });
  }
  getDate(evt){
    this.dateShow = evt.target.value;
  }
  getPrice(evt) {
    this.price = evt.target.value;
  }
  getTime(evt) {
    this.time = evt.target.value;
  }
  submitShowtime() {
    let day = this.dateShow + ' ' + this.time;
    let obj = {
      maPhim: this.selectedPhim,
      ngayChieuGioChieu: day,
      maRap: this.selectedMaRap,
      giaVe: this.price,
    };
    this.cinemaSer.showtime(obj).subscribe(data => {
      if (data) {
        alert('Thêm thành công')
      }
    })
    console.log(day)
  }
}
