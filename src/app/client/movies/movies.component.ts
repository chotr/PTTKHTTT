import { HttpClient } from '@angular/common/http';
import { AfterViewInit, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { MovieService } from '../services/movie.service';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.scss'],
})
export class MoviesComponent implements OnInit, AfterViewInit {
  listMovie: any[] = [];
  public p: any;
  numberItemPage: number = 10;
  total: number;
  totalPage: number;
  disabled: boolean;
  isReady = false;
  listPage: any[] = [];
  conditionPre: boolean;
  conditionNext: boolean;
  totalPageArr: number[] = [];
  selectedIndex: number;

  constructor(
    private movieService: MovieService,
    private activatedRoute: ActivatedRoute,
    private http: HttpClient,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.p = this.activatedRoute.snapshot.paramMap.get('page') as string;
    if (!this.p) {
      this.getParamsFromUrl();
    }
    this.getDataMovie(this.p);
  }

  getParamsFromUrl() {
    this.activatedRoute.queryParams.subscribe((res) => {
      if (res) {
        this.p = res.currentPage;
        this.total = res.totalCount;
        this.totalPage = res.totalPages;
        this.selectedIndex = res.currentPage;
      }
    });
  }
  getDataMovie(page: any) {
    this.movieService
      .getMoviePagination(page, this.numberItemPage)
      .subscribe((res) => {
        if (res) {
          this.p = res.currentPage;
          this.total = res.totalCount;
          this.listMovie = res.items;
          this.totalPage = res.totalPages;
          this.selectedIndex = res.currentPage;
          for (let i = 1; i <= this.totalPage; i++) {
            this.totalPageArr.push(i);
          }
        }
      });
  }
  checkPre = (event) => {
    if (this.p === 1) {
      if (!this.isReady) {
        event.preventDefault();
      }
    }
  };
  checkNext = (event) => {
    if (this.p === this.totalPage) {
      if (!this.isReady) {
        event.preventDefault();
      }
    }
  };
  navigateTo(p: any) {
    this.router.navigate(['client/movies/Page', p]);
    this.movieService
      .getMoviePagination(p, this.numberItemPage)
      .subscribe((res) => {
        if (res) {
          this.listMovie = res.items;
        }
      });
  }
  navigateToPrev() {
    const abc = this.activatedRoute.snapshot.paramMap.get('page') as string;
    const url = parseInt(abc) - 1;

    if (parseInt(abc) > 1) {
      this.router.navigate(['client/movies/Page', url]);
      this.movieService
        .getMoviePagination(url, this.numberItemPage)
        .subscribe((res) => {
          if (res) {
            this.listMovie = res.items;
            this.selectedIndex = res.currentPage;
          }
        });
    }
  }
  navigateToNext() {
    const abc = this.activatedRoute.snapshot.paramMap.get('page') as string;
    const url = parseInt(abc) + 1;

    if (parseInt(abc) < this.totalPage) {
      this.router.navigate(['client/movies/Page', url]);
      this.movieService
        .getMoviePagination(url, this.numberItemPage)
        .subscribe((res) => {
          if (res) {
            this.listMovie = res.items;
            this.selectedIndex = res.currentPage;
          }
        });
    }
  }
  setIndex(index: number) {
    this.movieService
      .getMoviePagination(index, this.numberItemPage)
      .subscribe((res) => {
        if (res) {
          this.selectedIndex = res.currentPage;
        }
      });

      this.router.events.subscribe((evt) => {
        if (!(evt instanceof NavigationEnd)) {
            return;
        }
        window.scrollTo(0, 0)
    });

  }
  ngAfterViewInit(): void {}
}
