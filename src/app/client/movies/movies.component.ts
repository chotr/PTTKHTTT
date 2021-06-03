import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MovieService } from '../services/movie.service';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.scss'],
})
export class MoviesComponent implements OnInit {
  listMovie: any[] = [];
  public p: any;
  numberItemPage: number = 10;
  total: number;
  totalPage: number;
  disabled: boolean
  isReady = false;
  listPage: any[] = []
  conditionPre: boolean;
  conditionNext: boolean;


  constructor(
    private movieService: MovieService,
    private activatedRoute: ActivatedRoute,
    private http: HttpClient, 
    private router: Router
  ) {}

  ngOnInit(): void {
    // if (this.p === 1 ) {
    //   this.disabled = true
    // }
   

    this.p = this.activatedRoute.snapshot.paramMap.get('page') as string;
    if (!this.p) {
      this.getParamsFromUrl();
    }
    this.getDataMovie(this.p);
  }
  setPage(page: any) {
    page = this.activatedRoute.snapshot.paramMap.get('page') as string;

    if (!page) {
      this.getParamsFromUrl();
    }
    this.getDataMovie(page);

  }

  getParamsFromUrl() {
    this.activatedRoute.queryParams.subscribe((res) => {
      if (res) {
        this.p = res.currentPage;
        this.total = res.totalCount;
        this.totalPage = res.totalPages

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
        this.totalPage = res.totalPages

        }
      });
  }
  pageChanged(p: any){
    // this.p =page
    // this.activatedRoute.queryParams.subscribe(params => {
    //   page = params['page'];
    // });

    // this.activatedRoute.queryParams.subscribe(params => {
    //   evt = params['page'];
    // });
    this.p = p

    this.router.navigate(['/client/movies/Page', this.p]);

  }
  checkPre = (event) => {
    if (this.p === 1) {
      if (!this.isReady) {
        event.preventDefault();
      }
    }
   }
   checkNext = (event) => {
    if (this.p === this.totalPage) {
      if (!this.isReady) {
        event.preventDefault();
      }
    }
   }
   disabledPagePre(): boolean {
     if (this.p === 1) {
       return false
     }
     if (this.p !==1) {
       return true
     }
   }
   disabledPageNext(): boolean {
    if (this.p === this.totalPage) {
      return false
    }
    if (this.p !== this.totalPage) {
      return true
    }
   }
}
