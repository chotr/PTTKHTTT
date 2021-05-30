import { Component, OnInit } from '@angular/core';
import { MovieService } from 'src/app/client/services/movie.service';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent implements OnInit {

  movieData: any

  constructor(private movieService: MovieService) { }

  ngOnInit(): void {
    this.movieService.movieModal.subscribe((data) => {
      this.movieData = data
    })
  }

}
