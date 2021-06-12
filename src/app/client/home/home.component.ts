import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CinemasService } from '../services/cinemas.service';
import { MovieService } from '../services/movie.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  listMovie:any[] = [];
  listCinema: any[] = [];
  listCRP: any[] = [];
  listCumRap: any[] =[];
  maCumRapPhim ="BHDStar";
  constructor(private router: Router, private moviesService: MovieService, private cinemaSer: CinemasService) { }

  ngOnInit(): void {
    this.moviesService.getDataMovies().subscribe((res) => {
      this.listMovie = res;
    });
    this.cinemaSer.getCinemaInfor().subscribe((res) => {
      this.listCinema = res;
      // console.log(this.listCinema);
    })
    this.cinemaSer.getCinemaComplex(this.maCumRapPhim).subscribe((res) => {
      this.listCRP = res;
      // console.log(this.listCRP);
    })

  }
  navigateTo() {
    this.router.navigate(['client/movies/Page/1',]);
  }

  ChangeMaCumRap(item: any){
        this.maCumRapPhim = item;

        this.cinemaSer.getCinemaComplex(this.maCumRapPhim).subscribe((res) => {
          this.listCRP = res;

        })
  }



}
