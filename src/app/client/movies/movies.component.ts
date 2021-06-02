import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MovieService } from '../services/movie.service';
// import { PageService } from '../services/page.service';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.scss'],
})
export class MoviesComponent implements OnInit {
  listMovie: any[] = [];
  public p: number = 1;
  numberItemPage: number = 10;
  total: number;

  constructor(private movieService: MovieService, private http: HttpClient) {}

  ngOnInit(): void {
    const url = `
    https://movie0706.cybersoft.edu.vn/api/QuanLyPhim/LayDanhSachPhimPhanTrang?maNhom=GP09&soTrang=
    ${0}&soPhanTuTrenTrang=${
      this.numberItemPage
    }`;
    this.http.get(url).subscribe((data: any) => {
      this.listMovie = data.items;
      this.movieService.getDataMovies().subscribe((result) => {
        this.total = result.length;
        this.movieService.changeDataMovieModal(this.listMovie);
      });
      this.movieService.changeDataMovieModal(this.listMovie);
    });
  }
  setPage(page: number) {
    const url = `
    https://movie0706.cybersoft.edu.vn/api/QuanLyPhim/LayDanhSachPhimPhanTrang?maNhom=GP09&soTrang=
    ${page}&soPhanTuTrenTrang=${this.numberItemPage}`;
    this.http.get(url).subscribe((data: any) => {
      this.listMovie = data.items;
      this.movieService.getDataMovies().subscribe((result) => {
        this.total = result.length;
        this.movieService.changeDataMovieModal(this.listMovie);
      });
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
