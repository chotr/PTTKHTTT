import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';
import { MovieService } from '../services/movie.service';

@Component({
  selector: 'app-card-movie',
  templateUrl: './card-movie.component.html',
  styleUrls: ['./card-movie.component.scss'],
})
export class CardMovieComponent implements OnInit {
  @Input() movie: any;
  @Input() liked!: any[];
  @Input() movieList: any;

  constructor(private router: Router, private movieService: MovieService) {}

  action = 'like';

  likeInLiked = 0;

  ngOnChanges(): void {}

  ngOnInit(): void {}

  like(): void {
    this.countLike();
    // this.eventOutput.emit(this.film);
  }
  countLike(): void {
    this.liked.forEach((ele) => {
      if (ele.id === this.movie.id) {
        if (this.action == 'like') {
          this.action = 'unlike';
          ele.totalLike++;
          this.likeInLiked = ele.totalLike;
        } else {
          this.action = 'like';
          ele.totalLike--;
          this.likeInLiked = ele.totalLike;
        }
      }
    });
  }
  navigateTo() {
    this.router.navigate(['client/detail-movie', this.movie.maPhim]);
  }
  callDialog() {
    this.movieService.changeDataMovieModal(this.movie);
  }
}
