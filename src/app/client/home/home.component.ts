import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { CinemasService } from '../services/cinemas.service';
import { MovieService } from '../services/movie.service';
import { OwlOptions } from 'ngx-owl-carousel-o';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {

  @ViewChild('carouselSlide') carouselSlide:any;
  listMovie: any[] = [];
  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    dots: false,
    navSpeed: 1000,
    navText: ['', ''],
    autoplayHoverPause:false,
    autoplay:true,
    autoplayTimeout:6000,
    responsive: {
      0: {
        items: 1,
      },
      400: {
        items: 1,
      },
      740: {
        items: 1,
      },
      940: {
        items: 1,
      },
    },
    nav: false,
  };
  constructor(
    private router: Router,
    private moviesService: MovieService,
    private cinemaSer: CinemasService
  ) {}

  ngOnInit(): void {
    this.moviesService.getDataMovies().subscribe((res) => {
      if (res) {
        this.hideloader()
      }
      this.listMovie = res;
    });
  }
  navigateTo() {
    this.router.navigate(['client/movies/Page']);
  }
  hideloader(){
    document.getElementById('spinner').style.display = 'none';
    document.getElementById('list_movie').style.display = 'block';
    document.getElementById('cinema').style.display = 'block';



  }
}
