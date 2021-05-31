import { Component, OnInit } from '@angular/core';
import { MovieService } from '../services/movie.service';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.scss'],
})
export class MoviesComponent implements OnInit {
  listMovie: any[] = [];
  p: number = 1;
  items = [];
  pageOfItems: Array<any>;

  constructor(private movieService: MovieService) {}

  ngOnInit(): void {
    this.movieService.getDataMovies().subscribe((res) => {
      this.listMovie = res;
      this.movieService.changeDataMovieModal(this.listMovie);
      // this.collection = this.listMovie;
    });
  }

}
