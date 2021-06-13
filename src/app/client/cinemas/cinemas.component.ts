import { CinemasService } from './../services/cinemas.service';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-cinemas',
  templateUrl: './cinemas.component.html',
  styleUrls: ['./cinemas.component.scss'],
})
export class CinemasComponent implements OnInit {
  // @Input() listCinema: any;
  // @Input() listCRP: any;
  listMovie: any[] = [];
  listCinema: any[] = [];
  listCRP: any[] = [];

  listCinemaArr = [];
  maHeThongRap: any;

  listCumRap: any;
  listPhim=[];
  listLichChieu: any;
  gioChieu: any;
  maCumRapPhim = 'BHDStar';
  arrAbc = [];

  @Output() newItem = new EventEmitter<string>();

  constructor(private cinemaSer: CinemasService) {}

  ngOnInit(): void {
    this.cinemaSer.getCinemaInfor().subscribe((res) => {
      this.listCinema = res;
      this.maHeThongRap = res.maHeThongRap;
      this.cinemaSer.getCinemaComplex(this.maCumRapPhim).subscribe((resu) => {
        this.listCRP = resu;
      });
    });
    this.getInfoShowTimes();
  }
  getInfoShowTimes() {
    this.cinemaSer
      .layThongtinHeThongLichChieu(this.maCumRapPhim)
      .subscribe((res) => {
        for (let i of res) {
          for (let j of i.lstCumRap) {
            this.listCRP = i.lstCumRap;
            for (let phim of j.danhSachPhim) {
              this.listPhim.push(phim);
            }
          }
        }
      });
  }

  layThongTinRap(item: any) {
    this.maCumRapPhim = item;
    this.getInfoShowTimes();
  }
  layLichChieu(evt) {}
}
