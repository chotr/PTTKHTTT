import { Component, OnInit } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { MovieService } from '../services/movie.service';
import Glide from '@glidejs/glide';
import { Router } from '@angular/router';

@Component({
  selector: 'app-coming',
  templateUrl: './coming.component.html',
  styleUrls: ['./coming.component.scss'],
})
export class ComingComponent implements OnInit {
  listMovie: any[] = [];
  listComing: any[] = [];
  image: string;
  name: string;
  trailer: string;
  description: string;
  biDanh: string;
  index = 2;
  dateComing: string;
  points: number;
  codeFilm: number;
  constructor(private router: Router, private moviesService: MovieService) {}
  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    dots: false,
    navSpeed: 1000,
    navText: ['', ''],
    autoplayHoverPause: false,
    autoplay: true,
    autoplayTimeout: 6000,
    responsive: {
      0: {
        items: 5,
      },
      400: {
        items: 5,
      },
      740: {
        items: 5,
      },
      940: {
        items: 5,
      },
    },
    nav: false,
  };
  ngOnInit(): void {
    this.moviesService.getDataMovies().subscribe((res) => {
      // if (res) {
      //   this.hideloader()
      // }
      this.listMovie = res;
      this.listComing = this.listMovie.slice(20, 25);
      for (let film of this.listComing) {
        this.image = this.listComing[2].hinhAnh;
        this.name = this.listComing[2].tenPhim;
        this.biDanh = this.listComing[2].biDanh;
        this.description = this.listComing[2].moTa;
        this.trailer = this.listComing[2].trailer;
        this.dateComing = this.listComing[2].ngayKhoiChieu;
        this.points = this.listComing[2].danhGia;
        this.codeFilm = this.listComing[2].maPhim;
      }
      console.log(this.listComing);
    });
  }
  shiftLeft() {
    const boxes = document.querySelectorAll('.box');
    const tmpNode = boxes[0];
    boxes[0].className = 'box move-out-from-left';
    if (this.index < 4) {
      this.index = this.index + 1;
    } else {
      this.index = 0;
    }

    for (let film of this.listComing) {
      this.image = this.listComing[this.index].hinhAnh;
      this.name = this.listComing[this.index].tenPhim;
      this.biDanh = this.listComing[this.index].biDanh;
      this.description = this.listComing[this.index].moTa;
      this.trailer = this.listComing[this.index].trailer;
      this.dateComing = this.listComing[this.index].ngayKhoiChieu;
      this.points = this.listComing[this.index].danhGia;
      this.codeFilm = this.listComing[this.index].maPhim;
    }
    setTimeout(function () {
      if (boxes.length > 5) {
        tmpNode.classList.add('box--hide');
        boxes[5].className = 'box move-to-position5-from-left';
      }
      boxes[1].className = 'box move-to-position1-from-left';
      boxes[2].className = 'box move-to-position2-from-left';
      boxes[3].className = 'box move-to-position3-from-left';
      boxes[4].className = 'box move-to-position4-from-left';
      boxes[0].remove();

      document.querySelector('.cards__container').appendChild(tmpNode);
    }, 500);
  }

  shiftRight() {
    const boxes = document.querySelectorAll('.box');
    boxes[4].className = 'box move-out-from-right';
    if (this.index > 0) {
      this.index = this.index - 1;
    } else {
      this.index = 4;
    }

    for (let film of this.listComing) {
      this.image = this.listComing[this.index].hinhAnh;
      this.name = this.listComing[this.index].tenPhim;
      this.biDanh = this.listComing[this.index].biDanh;
      this.description = this.listComing[this.index].moTa;
      this.trailer = this.listComing[this.index].trailer;
      this.dateComing = this.listComing[this.index].ngayKhoiChieu;
      this.points = this.listComing[this.index].danhGia;
      this.codeFilm = this.listComing[this.index].maPhim;
    }
    setTimeout(function () {
      const noOfCards = boxes.length;
      if (noOfCards > 4) {
        boxes[4].className = 'box box--hide';
      }

      const tmpNode = boxes[noOfCards - 1];
      tmpNode.classList.remove('box--hide');
      boxes[noOfCards - 1].remove();
      let parentObj = document.querySelector('.cards__container');
      parentObj.insertBefore(tmpNode, parentObj.firstChild);
      tmpNode.className = 'box move-to-position1-from-right';
      boxes[0].className = 'box move-to-position2-from-right';
      boxes[1].className = 'box move-to-position3-from-right';
      boxes[2].className = 'box move-to-position4-from-right';
      boxes[3].className = 'box move-to-position5-from-right';
    }, 500);
  }
  navigateTo() {
    this.router.navigate(['client/detail-movie', this.codeFilm]);
  }
}
