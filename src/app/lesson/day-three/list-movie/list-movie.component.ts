import { Component, OnInit, QueryList, ViewChildren } from '@angular/core';
import { MovieService } from 'src/app/client/services/movie.service';
import { ItemMovieComponent } from '../item-movie/item-movie.component';

@Component({
  selector: 'app-list-movie',
  templateUrl: './list-movie.component.html',
  styleUrls: ['./list-movie.component.scss'],
})
export class ListMovieComponent implements OnInit {
  @ViewChildren(ItemMovieComponent)
  itemMovieTagList!: QueryList<ItemMovieComponent>;

  listMovie: any [];
  listLikeMovie = [
    {
      id: '1',
      name: 'Movie 1',
      totalLike: 200,
    },
    {
      id: '2',
      name: 'Movie 2',
      totalLike: 250,
    },
    {
      id: '3',
      name: 'Movie 3',
      totalLike: 600,
    },
    {
      id: '4',
      name: 'Movie 4',
      totalLike: 430,
    },
  ];

  constructor(private movieService: MovieService) {}

  ngOnInit(): void {
    this.listMovie = this.movieService.listFilm
  }

  invokeActionFromChild(eveantValue: any): void {
    // eveantValue.totalLike ++;
    this.listLikeMovie.forEach((item) => {
      if (item.id === eveantValue.id) {
        item.totalLike++;
      }
    });
  }
  demoViewChildren() {
    this.itemMovieTagList.map((item) => {
      item.film.details = 'abcdefgh';
    });
  }
}
