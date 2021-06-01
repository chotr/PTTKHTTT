import { Component, OnInit } from '@angular/core';
import { MovieService } from '../services/movie.service';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.scss'],
})
export class MoviesComponent implements OnInit {
  listMovie: any[] = [];
  p: number=1;
  // items = [];
  numberItemPage: number=10;
  total: number;
  // curPage: number;

  constructor(private movieService: MovieService) {}

  ngOnInit(): void {
    this.movieService
      .getMoviePagination(this.p, this.numberItemPage)
      .subscribe((res) => {
        this.listMovie = res.items;
        
        this.movieService.getDataMovies().subscribe((result) => {
          this.total = result.length;
          this.movieService.changeDataMovieModal(this.listMovie);
        });
      });   
  }
}
