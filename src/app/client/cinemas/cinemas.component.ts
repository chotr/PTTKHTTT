import { CinemasService } from './../services/cinemas.service';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-cinemas',
  templateUrl: './cinemas.component.html',
  styleUrls: ['./cinemas.component.scss']
})
export class CinemasComponent implements OnInit {

  @Input() listCinema: any;
  @Input() listCRP: any;
  listCumRap: any;
  listPhim: any;
  listLichChieu: any;
  gioChieu: any;

  @Output() newItem = new EventEmitter<string>();

  constructor(private cinemaSer: CinemasService) { }

  ngOnInit(): void {
    this.cinemaSer.layThongtinHeThongLichChieu("BHDStar").subscribe((res)=> {
      // console.log(res);
      // this.listCumRap = res[0].lstCumRap;
      // console.log(this.listCumRap);
      this.listPhim = res[0].lstCumRap[0].danhSachPhim;
      console.log(this.listPhim);
      this.gioChieu = this.listPhim[0].lstLichChieuTheoPhim[0].ngayChieuGioChieu.slice(14,19) ;
   
      // lstLichChieuTheoPhim[0].ngayChieuGioChieu
  })
  this.cinemaSer.layThongtinLichChieu("1337").subscribe((res) => {
   
      // this.listLichChieu = res;
      // console.log(this.listLichChieu);
  })

  }

  layThongTinRap(value: string){
  //  console.log(value);
   this.newItem.emit(value);
  }


}
