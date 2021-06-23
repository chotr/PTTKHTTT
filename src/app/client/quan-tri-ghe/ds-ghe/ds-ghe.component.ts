import { OnChanges, SimpleChanges } from '@angular/core';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CinemasService } from '../../services/cinemas.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-ds-ghe',
  templateUrl: './ds-ghe.component.html',
  styleUrls: ['./ds-ghe.component.scss'],
})
export class DsGheComponent implements OnInit, OnChanges {
  @ViewChild('dataContainer') dataContainer: ElementRef;
  @ViewChild('dataContainer1') dataContainer1: ElementRef;
  @ViewChild('dataContainer2') dataContainer2: ElementRef;

  dsGhe = [];

  soGheDaDat: number = 0;
  soGheConLai: number = 0;
  soGheDangDat: any[] = [];
  id: any;
  price = [];
  totalPrice = 0;
  dsVe = [];
  taiKhoan: any;

  bgColor = '#ffb100';
  bgColor1 = '#6c757d';
  bgColor2 = '#f8f9fa';
  bgColor3 = '#28a745';

  constructor(
    private activatedRoute: ActivatedRoute,
    private cinema: CinemasService
  ) {}

  ngOnInit(): void {
    const account = JSON.parse(localStorage.getItem('account') as string);
    if (account !== null) {
      this.taiKhoan = account.taiKhoan;
    }
    for (let ghe of this.dsGhe) {
      if (!ghe.daDat) {
        // this.soGheConLai = this.dsGhe.length;
        // this.soGheConLai++;
      }
    }

    this.id = this.activatedRoute.snapshot.paramMap.get('id') as string;
    if (!this.id) {
      this.getParamsFromUrl();
    }
    this.getDataSeat(this.id);
  }
  datGheParent(evt, ghe) {
    let giave = [];
    let total = 0;
    let ds = [];

    if (evt) {
      // this.soGheDaDat++;
      // this.soGheConLai--;
      this.soGheDangDat.push(ghe);
    } else {
      // this.soGheDaDat--;
      // this.soGheConLai++;

      for (let i in this.soGheDangDat) {
        if (this.soGheDangDat[i] === ghe) {
          this.soGheDangDat.splice(parseInt(i), 1);
        }
      }
    }
    for (let gia of this.soGheDangDat) {
      giave.push(gia.giaVe);
      ds.push({ maGhe: gia.maGhe, giaVe: gia.giaVe });
    }
    this.price = giave;
    this.dsVe = ds;
    for (let i of this.price) {
      total += i;
    }
    this.totalPrice = total;
  }
  getParamsFromUrl() {
    this.activatedRoute.queryParams.subscribe((res) => {
      if (res) {
        // console.log(res);
      }
    });
  }
  getDataSeat(id) {
    this.cinema.getDetailSeat(id).subscribe((res) => {
      if (res) {
        this.dsGhe = res.danhSachGhe;
        for (let i in res.danhSachGhe) {
          if (res.danhSachGhe[i].daDat === true) {
            this.soGheDaDat++;
          }
          if (res.danhSachGhe[i].daDat === false) this.soGheConLai++;
        }
      }
    });
  }
  ngOnChanges(changes: SimpleChanges): void {}
  bookingSubmit() {
    let obj = {
      maLichChieu: this.id,
      danhSachVe: this.dsVe,
      taiKhoanNguoiDung: this.taiKhoan,
    };
    this.cinema.getBook(obj).subscribe((res) => {
      if (res) {
        Swal.fire({
          title: 'Thông báo',
          text: 'Đặt vé thành công!',
          icon: 'success',
          showCancelButton: false,
          confirmButtonText: 'Xác nhận!',
        }).then((result) => {
          if (result.isConfirmed) {
            this.getDataSeat(this.id);
            this.dataContainer.nativeElement.innerHTML = '';
            this.dataContainer1.nativeElement.innerHTML = '';
            this.totalPrice = 0;
          }
        });
      }
    });
  }
}
