import { HttpClient } from '@angular/common/http';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MovieService } from 'src/app/client/services/movie.service';

@Component({
  selector: 'app-movie-management',
  templateUrl: './movie-management.component.html',
  styleUrls: ['./movie-management.component.scss'],
})
export class MovieManagementComponent implements OnInit, AfterViewInit {
  @ViewChild('addMovieForm') addMovieFormTag: NgForm;

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
  isDisabled: boolean;
  
  movie = {
    maPhim: '',
    tenPhim: '',
    biDanh: '',
    trailer: '',
    hinhAnh: {},
    moTa: '',
    maNhom: 'GP09',
    ngayKhoiChieu: '',
    danhGia: 0,
  };
  public disabledPage: boolean;

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

  ngAfterViewInit(): void {
    console.log(this.addMovieFormTag)
  }

  getParamsFromUrl() {
    this.activatedRoute.queryParams.subscribe((res) => {
      if (res) {
        this.p = res.currentPage;
        this.total = res.totalCount;
        this.totalPage = res.totalPages;
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
          // console.log(this.listMovie)
          this.totalPage = res.totalPages;
          for (let i = 1; i <= this.totalPage; i++) {
            this.totalPageArr.push(i);
          }
        }
      });
  }

  getImage(evt: any) : void {
    this.movie.hinhAnh = evt
  }
  getForm(evt:any){
    this.movie={
      maPhim: evt.maPhim,
      tenPhim: evt.tenPhim,
      biDanh: evt.biDanh,
      trailer: evt.trailer,
      hinhAnh: evt.hinhAnh,
      moTa: evt.moTa,
      maNhom: 'GP09',
      ngayKhoiChieu: evt.ngayKhoiChieu,
      danhGia: 7,
    }
  }
  addMovie() {
    const uploadData = new FormData();
    for(let key in this.movie){
      uploadData.append(key, this.movie[key]);
    }

    this.movieService.addMovie(uploadData).subscribe(data => {
      if (data) {
        alert('Thành công')
      }
    });
  }
  updateForm(){
    const uploadData = new FormData();
    for(let key in this.movie){
      uploadData.append(key, this.movie[key]);
    }

    this.movieService.updateMovie(uploadData).subscribe(data => {
      if (data) {
        alert('Thành công')
        window.location.reload();
      }
    });
  }
  update(data) {
    this.movie = {
      maPhim: data.getAttribute('data-maPhim'),
      tenPhim: data.getAttribute('data-tenPhim'),
      biDanh: data.getAttribute('data-biDanh'),
      trailer: data.getAttribute('data-trailer'),
      hinhAnh: {},
      moTa: data.getAttribute('data-moTa'),
      maNhom: 'GP09',
      ngayKhoiChieu: data.getAttribute('data-ngayKhoiChieu'),
      danhGia: 7,
    }
    this.isDisabled = true
  }
  resetForm() {
    for (let index in this.movie) {
      this.movie[index] = null;
    }
    this.movie.maNhom = "GP09"
    this.isDisabled = true;
  }
  deleteMovie(id: any){
    this.movieService.deleteMovie(id).subscribe(data =>{
      if (data) {
        alert('Xóa thành công')
        window.location.reload();
      }
    })
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
  disabledPagePre(): boolean {
    if (this.p === 1) {
      return false;
    }
    if (this.p !== 1) {
      return true;
    }
  }
  disabledPageNext(): boolean {
    if (this.p === this.totalPage) {
      return false;
    }
    if (this.p !== this.totalPage) {
      return true;
    }
  }
}
