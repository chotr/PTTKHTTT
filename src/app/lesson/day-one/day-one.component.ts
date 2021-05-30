import { Component, OnInit } from '@angular/core';
import { MovieService } from 'src/app/client/services/movie.service';

@Component({
  selector: 'app-day-one',
  templateUrl: './day-one.component.html',
  styleUrls: ['./day-one.component.scss']
})
export class DayOneComponent implements OnInit {

  constructor(private movie: MovieService) { }

  ngOnInit(): void {
  }

}
