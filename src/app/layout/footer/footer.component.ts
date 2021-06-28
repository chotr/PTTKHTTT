import { Component, OnInit } from '@angular/core';
import { CinemasService } from 'src/app/client/services/cinemas.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
})
export class FooterComponent implements OnInit {
  listCinema = [];
  constructor(private cinema: CinemasService) {}

  ngOnInit(): void {
    this.cinema.getCinemaInfor().subscribe((data) => {
      this.listCinema = data;
      console.log(this.listCinema)
    });
  }
}
