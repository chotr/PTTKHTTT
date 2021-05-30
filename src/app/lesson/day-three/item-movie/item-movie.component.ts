import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChildren,
} from '@angular/core';

@Component({
  selector: 'app-item-movie',
  templateUrl: './item-movie.component.html',
  styleUrls: ['./item-movie.component.scss'],
})
export class ItemMovieComponent implements OnInit {
  [x: string]: any;
  @Input() film: any;
  @Input() liked!: any[];
  @Input() likee: any;
  @Output() eventOutput = new EventEmitter();

  action = 'like';

  likeInLiked = 0;
  constructor() {}

  like(): void {
    this.countLike();
    // this.eventOutput.emit(this.film);
  }
  countLike(): void {
    this.liked.forEach((ele) => {
      if (ele.id === this.film.id) {
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

  ngOnInit(): void {
    const objLikeMovie = this.liked.find((item) => {
      return item.id === this.film.id;
    });
    this.likeInLiked = objLikeMovie ? objLikeMovie.totalLike : this.likeInLiked;
  }
}
