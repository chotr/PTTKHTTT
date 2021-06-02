import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MovieService } from '../services/movie.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  listMovie:any[] = [];

  constructor(private router: Router, private moviesService: MovieService) { }

  ngOnInit(): void {
    this.moviesService.getDataMovies().subscribe((res) => {
      this.listMovie = res;
    });
  }
  navigateTo() {
    this.router.navigate(['client/movies/Page/1',]);
  }

}
