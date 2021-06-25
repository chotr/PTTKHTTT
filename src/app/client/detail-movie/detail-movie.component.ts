import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MovieService } from '../services/movie.service';

@Component({
  selector: 'app-detail-movie',
  templateUrl: './detail-movie.component.html',
  styleUrls: ['./detail-movie.component.scss'],
})
export class DetailMovieComponent implements OnInit {
  @ViewChild('iframe') iframe: ElementRef;
  url: string = ''


  detailMovie: any;
  id: string | null | undefined;

  constructor(
    private activatedRoute: ActivatedRoute,
    private movieSer: MovieService
  ) {}


  ngOnInit(): void {
    this.id = this.activatedRoute.snapshot.paramMap.get('idMovie') as string;
    if (!this.id) {
      this.getParamsFromUrl();
    }
    this.getDataMovie(this.id);
  }
  getParamsFromUrl() {
    this.activatedRoute.queryParams.subscribe((res) => {
      if (res) {
        this.detailMovie = res.maPhim;
      }
    });
  }
  getDataMovie(idMovie: string) {
    this.movieSer.getDetailMovie(idMovie).subscribe((res) => {
      if (res) {       
        this.hideloader();
      }
      this.detailMovie = res;
        console.log(this.detailMovie);
        let trailer = this.detailMovie.trailer;
        this.url = trailer;
    });
  }
  hideloader(){
    document.getElementById('spinner').style.display = 'none';
    document.getElementById('content').style.display = 'block';
  }

}
