import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
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

  constructor(
    private activatedRoute: ActivatedRoute,
    private cinema: CinemasService
  ) {}

  ngOnInit(): void {
    this.url = this.activatedRoute.snapshot.paramMap.get('id') as string;
    let getUrl = this.url.split('?maCR=');
    this.maHeThong = getUrl[0];
    this.maCR = getUrl[1];
    this.dsCumRap(this.maHeThong);
    this.defaultCR();
    this.getDetailCinema(this.maHeThong)
  }

  dsCumRap(maht) {
    this.cinema.getCinemaComplex(maht).subscribe((res) => {
      if(res){
        this.hideloader();
      }
      for (let i of res) {
        if (i.maCumRap === this.maCR) {
          this.nameCR = i.tenCumRap;
          this.diaChi = i.diaChi;
          console.log(this.nameCR, this.diaChi);
        }
      }
    });
  }
  getDetailCinema(id){
    this.cinema.getDetailCenema(id).subscribe((res)=>{
      console.log(res)
    })
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
}
