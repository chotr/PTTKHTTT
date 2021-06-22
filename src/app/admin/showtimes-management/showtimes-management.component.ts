import { AfterViewInit } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { CinemasService } from 'src/app/client/services/cinemas.service';

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

  constructor(private cinemaSer: CinemasService) {}

  ngOnInit(): void {
    // this.getNameCinema();
  }

  ngAfterViewInit(): void {
    this.getNameCinema();
    // this.mySelectHandler(this.selectedmaHeThong)
    // this.
  }
  getNameCinema() {
    this.cinemaSer.getCinemaInfor().subscribe((res) => {
      for (let ma of res) {
        this.maHeThongRap.push({ name: ma.maHeThongRap });
      }
    });
  }
  mySelectHandler(evt) {
    this.cinemaSer.getCinemaComplex(evt).subscribe((res) => {
      for (let ma of res) {
        // this.cumRap = null;
        this.cumRap.push({ value: ma.maCumRap, name: ma.tenCumRap });

        // if (this.cumRap == null) {

        // } else if(this.cumRap !== null){
        //   this.cumRap = null
        //   this.mySelectHandler(evt)
        // }
        
      }
    });
  }
  selectMaRap() {
    this.cinemaSer.getCinemaComplex(this.selectedmaHeThong).subscribe((res) => {
      for (let ma of res) {
        console.log(ma);
        if (ma.maCumRap === this.selectedCumRap) {
          for (let rap of ma.danhSachRap) {
            this.maRap.push({ value: rap.maRap, name: rap.tenRap });
          }
        }
      }
    });
  }
}
