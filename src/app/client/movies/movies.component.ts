import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MovieService } from '../services/movie.service';
// import { PageService } from '../services/page.service';

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

  constructor(
    private movieService: MovieService,
    private activatedRoute: ActivatedRoute,
    private http: HttpClient, 
    private router: Router
  ) {}

  ngOnInit(): void {
    // const url = `
    // https://movie0706.cybersoft.edu.vn/api/QuanLyPhim/LayDanhSachPhimPhanTrang?maNhom=GP09&soTrang=
    // ${this.p}&soPhanTuTrenTrang=${this.numberItemPage}`;
    // this.http.get(url).subscribe((data: any) => {
    //   this.listMovie = data.items;
    //   this.movieService.getDataMovies().subscribe((result) => {
    //     this.total = result.length;
    //     this.movieService.changeDataMovieModal(this.listMovie);
    //   });
    //   this.movieService.changeDataMovieModal(this.listMovie);
    // });

    this.p = this.activatedRoute.snapshot.paramMap.get('page') as string;
    if (!this.p) {
      this.getParamsFromUrl();
    }
    this.getDataMovie(this.p);
  }
  setPage(page: any) {
    // this.p = page
    // const url = `
    // https://movie0706.cybersoft.edu.vn/api/QuanLyPhim/LayDanhSachPhimPhanTrang?maNhom=GP09&soTrang=
    // ${page}&soPhanTuTrenTrang=${this.numberItemPage}`;
    // this.http.get(url).subscribe((data: any) => {
    //   this.listMovie = data.items;
    //   this.movieService.getDataMovies().subscribe((result) => {
    //     this.total = result.length;
    //     this.movieService.changeDataMovieModal(this.listMovie);
    //   });
    // });

    // this.p = page;

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
      }
    });
  }
  getDataMovie(page: any) {
    this.movieService
      .getMoviePagination(page, this.numberItemPage)
      .subscribe((res) => {
        if (res) {
          this.p = res;
          this.total = res.totalCount;
          this.listMovie = res.items;
        }
      });
  }
}

// not complete

// this.movieService
//   .getMoviePagination(this.p, this.numberItemPage)
//   .subscribe((res) => {
//     this.listMovie = res.items;

// this.movieService.getDataMovies().subscribe((result) => {
//   this.total = result.length;
//   this.movieService.changeDataMovieModal(this.listMovie);
// });
// });

// complete but not true
