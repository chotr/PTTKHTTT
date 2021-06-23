import { OnChanges, SimpleChanges } from '@angular/core';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CinemasService } from '../../services/cinemas.service';

@Component({
  selector: 'app-ds-ghe',
  templateUrl: './ds-ghe.component.html',
  styleUrls: ['./ds-ghe.component.scss'],
})
export class DsGheComponent implements OnInit, OnChanges {
  dsGhe = [];

  soGheDaDat: number = 0;
  soGheConLai:number = 0;
  soGheDangDat: any[] = [];
  giaVee: number = 0;
  id: any;
  price=[];
  totalPrice = 0;

  bgColor = '#ffb100';
  bgColor1 = '#6c757d';
  bgColor2 = '#f8f9fa';
  bgColor3 = '#28a745';

  @ViewChild('dataContainer') dataContainer: ElementRef;

  constructor(private activatedRoute: ActivatedRoute, private getSeat: CinemasService) {}

  ngOnInit(): void {
    for (let ghe of this.dsGhe) {
      if (!ghe.daDat) {
        this.soGheConLai =this.dsGhe.length
        this.soGheConLai++;
      }
      // if(ghe.daDat){
      //   this.soGheDaDat ++
      // }
    }

    this.id = this.activatedRoute.snapshot.paramMap.get('id') as string;
    if (!this.id) {
      this.getParamsFromUrl();
    }
    this.getDataSeat(this.id);
  }
  datGheParent(evt, ghe) {
    let giave = []
    let total = 0

    // console.log(evt, ghe);
    if (evt) {
      this.soGheDaDat++;
      this.soGheConLai--;
      this.soGheDangDat.push(ghe);
      // this.giaVee = this.soGheDaDat ;
      // console.log(this.soGheDangDat);
    } else {
      this.soGheDaDat--;
      this.soGheConLai++;
      // this.giaVee = this.soGheDaDat * this.price;

      for (let i in this.soGheDangDat) {
        if (this.soGheDangDat[i] === ghe) {
          this.soGheDangDat.splice(parseInt(i), 1);
        }
      }
    }
    for(let gia of this.soGheDangDat){
      giave.push(gia.giaVe);

    }
    this.price = giave
    for(let i of this.price){
      total += i
    }
    this.totalPrice = total

  }
  getParamsFromUrl() {
    this.activatedRoute.queryParams.subscribe((res) => {
      if (res) {
        // console.log(res);
      }
    });
  }
  getDataSeat(id){
    this.getSeat.getDetailSeat(id).subscribe((res)=>{
      if (res) {
        this.dsGhe = res.danhSachGhe
        this.soGheConLai = res.danhSachGhe.length
        // this.price = res.danhSachGhe.giaVe
        // console.log(res)
      }
    })
  }
  ngOnChanges(changes: SimpleChanges): void {
    this.soGheConLai = this.dsGhe.length;
  }
}
