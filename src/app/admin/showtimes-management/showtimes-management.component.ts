import { AfterViewInit, ElementRef, ViewChild } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { CinemasService } from 'src/app/client/services/cinemas.service';
import { MovieService } from 'src/app/client/services/movie.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-showtimes-management',
  templateUrl: './showtimes-management.component.html',
  styleUrls: ['./showtimes-management.component.scss'],
})
export class ShowtimesManagementComponent implements OnInit, AfterViewInit {
  @ViewChild('searchInput') searchInput: ElementRef;
  @ViewChild('searchInput1') searchInput1: ElementRef;
  @ViewChild('searchInput2') searchInput2: ElementRef;
  maHeThongRap = [];
  selectedmaHeThong: any;
  cumRap = [];
  selectedCumRap: any;
  maRap = [];
  selectedMaRap: any;
  dsPhim = [];
  selectedPhim: any;

  dateShow: '';
  price: any;
  time: '';

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
  getDate(evt) {
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
    this.cinemaSer.showtime(obj).subscribe((data) => {
      if (data) {
        Swal.fire({
          title: 'Thông báo',
          text: 'Thêm thành công!',
          icon: 'success',
          showCancelButton: false,
          confirmButtonText: 'Xác nhận!',
        }).then((result) => {
          if (result.isConfirmed) {
            this.getNameCinema();
            this.getMovie();
            this.getMovie();
            this.maHeThongRap = [];
            this.selectedmaHeThong = null;
            this.cumRap = [];
            this.selectedCumRap = null;
            this.maRap = [];
            this.selectedMaRap = null;
            this.dsPhim = [];
            this.selectedPhim = null;
            this.dateShow = null;
            this.price = null;
            this.time = null;
            this.searchInput.nativeElement.value = '';
            this.searchInput1.nativeElement.value = '';
            this.searchInput2.nativeElement.value = '';

          }
        });
      }
    });
    console.log(day);
  }
}
