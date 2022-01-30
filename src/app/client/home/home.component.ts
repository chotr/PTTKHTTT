import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { CinemasService } from '../services/cinemas.service';
import { MovieService } from '../services/movie.service';
import { OwlOptions } from 'ngx-owl-carousel-o';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  @ViewChild('carouselSlide') carouselSlide: any;
  listMovie: any[] = [];
  listNewMovie = [
    {
      id: 1,
      name: 'Spider-Man: No Way Home',
      image: '../../../assets/imageMV/image_spider.jpg',
      moTa: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Reprehenderit illo nobis a rerum quae tenetur sint quas dolor maiores unde officia, quo nulla minus voluptatum eligendi illum voluptatem quisquam iste.Aut, sequi veniam possimus natus consequuntur accusantium alias recusandae cum fuga. Ipsam obcaecati temporibus atque aliquid quos. Pariatur minima aspernatur quis, id, possimus repellendus odio porro recusandae perferendis iste harum.',
      bgImage: '../../../assets/imageMV/banner_spider.jpg',
      biDanh: '',
      ngayCHieu: '',
    },
    {
      id: 2,
      name: 'The Conjuring 2',
      image: '../../../assets/imageMV/image_conjuring2.jpg',
      moTa: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Reprehenderit illo nobis a rerum quae tenetur sint quas dolor maiores unde officia, quo nulla minus voluptatum eligendi illum voluptatem quisquam iste.Aut, sequi veniam possimus natus consequuntur accusantium alias recusandae cum fuga. Ipsam obcaecati temporibus atque aliquid quos. Pariatur minima aspernatur quis, id, possimus repellendus odio porro recusandae perferendis iste harum.',
      bgImage: '../../../assets/imageMV/banner_conjuring2.jpg',
      biDanh: '',
      ngayCHieu: '',
    },
    {
      id: 3,
      name: 'Fast And Furious 9',
      image: '../../../assets/imageMV/image_faf9.jpg',
      moTa: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Reprehenderit illo nobis a rerum quae tenetur sint quas dolor maiores unde officia, quo nulla minus voluptatum eligendi illum voluptatem quisquam iste.Aut, sequi veniam possimus natus consequuntur accusantium alias recusandae cum fuga. Ipsam obcaecati temporibus atque aliquid quos. Pariatur minima aspernatur quis, id, possimus repellendus odio porro recusandae perferendis iste harum.',
      bgImage: '../../../assets/imageMV/banner_faf9.jpg',
      biDanh: '',
      ngayCHieu: '',
    },
    {
      id: 4,
      name: 'Shang Chi',
      image: '../../../assets/imageMV/image_shangchi.jpg',
      moTa: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Reprehenderit illo nobis a rerum quae tenetur sint quas dolor maiores unde officia, quo nulla minus voluptatum eligendi illum voluptatem quisquam iste.Aut, sequi veniam possimus natus consequuntur accusantium alias recusandae cum fuga. Ipsam obcaecati temporibus atque aliquid quos. Pariatur minima aspernatur quis, id, possimus repellendus odio porro recusandae perferendis iste harum.',
      bgImage: '../../../assets/imageMV/banner_shangchi.jpg',
      biDanh: '',
      ngayCHieu: '',
    },
    {
      id: 5,
      name: 'Spider-Man: No Way Home',
      image: '../../../assets/imageMV/image_spider.jpg',
      moTa: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Reprehenderit illo nobis a rerum quae tenetur sint quas dolor maiores unde officia, quo nulla minus voluptatum eligendi illum voluptatem quisquam iste.Aut, sequi veniam possimus natus consequuntur accusantium alias recusandae cum fuga. Ipsam obcaecati temporibus atque aliquid quos. Pariatur minima aspernatur quis, id, possimus repellendus odio porro recusandae perferendis iste harum.',
      bgImage: '../../../assets/imageMV/banner_spider.jpg',
      biDanh: '',
      ngayCHieu: '',
    },
    {
      id: 6,
      name: 'Shang Chi',
      image: '../../../assets/imageMV/image_shangchi.jpg',
      moTa: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Reprehenderit illo nobis a rerum quae tenetur sint quas dolor maiores unde officia, quo nulla minus voluptatum eligendi illum voluptatem quisquam iste.Aut, sequi veniam possimus natus consequuntur accusantium alias recusandae cum fuga. Ipsam obcaecati temporibus atque aliquid quos. Pariatur minima aspernatur quis, id, possimus repellendus odio porro recusandae perferendis iste harum.',
      bgImage: '../../../assets/imageMV/banner_shangchi.jpg',
      biDanh: '',
      ngayCHieu: '',
    },
    {
      id: 7,
      name: 'Spider-Man: No Way Home',
      image: '../../../assets/imageMV/image_spider.jpg',
      moTa: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Reprehenderit illo nobis a rerum quae tenetur sint quas dolor maiores unde officia, quo nulla minus voluptatum eligendi illum voluptatem quisquam iste.Aut, sequi veniam possimus natus consequuntur accusantium alias recusandae cum fuga. Ipsam obcaecati temporibus atque aliquid quos. Pariatur minima aspernatur quis, id, possimus repellendus odio porro recusandae perferendis iste harum.',
      bgImage: '../../../assets/imageMV/banner_spider.jpg',
      biDanh: '',
      ngayCHieu: '',
    },
  ];
  dsRap: any[] = [];
  dsCR: any[] = [];
  dsLC: any[] = [];
  maPhim: any;
  maHT: any;
  maLC: any;
  disabledT = false;
  index = 0;
  image: string;
  name: string;
  bg_image: string;
  biDanh: string;
  ngayCHieu: string;
  description: string;
  windowInterval: number;
  tenPhim = 'Chọn phim ...';
  tenRap = 'Chọn rạp ...';
  cumRap = 'Chọn cụm rạp ...';
  lc = 'Chọn giờ chiếu ...';
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
        this.hideloader();
      }
      this.listMovie = res.slice(10, 20);
    });
    this.getInfo(0);
    this.replay();
  }
  getMaPhim(maPhim, tenPhim): void {
    this.tenRap = 'Chọn rạp ...';
    this.cumRap = 'Chọn cụm rạp ...';
    this.lc = 'Chọn giờ chiếu ...';
    this.dsRap = [];
    this.dsCR = [];
    this.maPhim = maPhim;
    this.tenPhim = tenPhim;
    let listTemp = [];
    this.cinemaSer.layThongtinLichChieuTheoPhim(maPhim).subscribe((res) => {
      if (res) {
        for (let heThong of res.heThongRapChieu) {
          listTemp.push({
            maHT: heThong.maHeThongRap,
            tenHeThongRap: heThong.tenHeThongRap,
          });
        }
      }
    });
    listTemp = this.dsRap;
  }
  getMaRap(maHT, tenHT): void {
    this.cumRap = 'Chọn cụm rạp ...';
    this.lc = 'Chọn giờ chiếu ...';
    this.tenRap = tenHT;
    this.maHT = maHT;
    let listTemp = [];
    this.cinemaSer
      .layThongtinLichChieuTheoPhim(this.maPhim)
      .subscribe((res) => {
        if (res) {
          for (let heThong of res.heThongRapChieu) {
            for (let cr of heThong.cumRapChieu) {
              if (heThong.maHeThongRap === this.maHT) {
                listTemp.push({
                  maCR: cr.maCumRap,
                  tenCR: cr.tenCumRap,
                });
              }
            }
          }
        }
      });
    this.dsCR = listTemp;
  }
  getMaCumRap(maCR, tenCR): void {
    this.lc = 'Chọn giờ chiếu ...';
    this.cumRap = tenCR;
    let listTemp = [];
    this.cinemaSer
      .layThongtinLichChieuTheoPhim(this.maPhim)
      .subscribe((res) => {
        if (res) {
          for (let heThong of res.heThongRapChieu) {
            for (let cr of heThong.cumRapChieu) {
              if (heThong.maHeThongRap === this.maHT) {
                if (maCR === cr.maCumRap) {
                  for (let lc of cr.lichChieuPhim) {
                    listTemp.push({
                      maLC: lc.maLichChieu,
                      ngayChieu: lc.ngayChieuGioChieu,
                    });
                  }
                }
              }
            }
          }
        }
      });

    listTemp = this.dsLC;
    console.log(this.dsLC);
  }
  getMaLC(maLC: any, ngayChieu): void {
    this.maLC = maLC;
    this.lc = ngayChieu;
    if (this.maLC !== 'Chọn giờ chiếu ...') {
      this.disabledT = true;
    }
  }
  sbmDatVe() {
    const account = JSON.parse(localStorage.getItem('account') as string);
    if (account !== null) {
      if (this.lc === 'Chọn giờ chiếu ...') {
        Swal.fire({
          title: 'Thông báo',
          text: 'Vui lòng chọn đủ thông tin!',
          icon: 'warning',
          showCancelButton: false,
          confirmButtonText: 'Xác nhận!',
        });
      }
      if (
        this.tenPhim !== 'Chọn phim ...' &&
        this.tenRap !== 'Chọn rạp ...' &&
        this.cumRap !== 'Chọn cụm rạp ...' &&
        this.lc !== 'Chọn giờ chiếu ...'
      ) {
        this.router.navigate(['client/danhSachGhe', this.maLC]);
      }
    }
    if (account === null) {
      Swal.fire({
        title: 'Thông báo',
        text: 'Vui lòng đăng nhập!',
        icon: 'warning',
        showCancelButton: false,
        confirmButtonText: 'Xác nhận!',
      });
    }
  }
  navigateTo() {
    this.router.navigate(['client/movies/Page']);
  }
  hideloader() {
    document.getElementById('spinner').style.display = 'none';
    document.getElementById('list_movie').style.display = 'block';
    document.getElementById('cinema').style.display = 'block';
  }
  getInfo(index) {
    this.image = this.listNewMovie[index].image;
    this.name = this.listNewMovie[index].name;
    this.bg_image = this.listNewMovie[index].bgImage;
    this.biDanh = this.listNewMovie[index].biDanh;
    this.description = this.listNewMovie[index].moTa;
    this.ngayCHieu = this.listNewMovie[index].ngayCHieu;
  }
  shiftLeft() {}
  shiftRight() {
    const boxes = document.querySelectorAll('.boxs');
    const tmpNode = boxes[0];
    const url = this.router.url;
    if (url !== '/client/home' && url !== '/home') {
      return clearInterval(this.windowInterval);
    }

    if (this.index < 6) {
      this.index = this.index + 1;
    } else {
      this.index = 0;
    }
    this.getInfo(this.index);

    setTimeout(() => {
      if (boxes.length > 7) {
        tmpNode.classList.add('boxs--hide');
        boxes[7].className = 'boxs move-to-position7-from-left-CR';
      }
      boxes[1].className = 'boxs move-to-position1-from-left-CR';
      boxes[2].className = 'boxs move-to-position2-from-left-CR';
      boxes[3].className = 'boxs move-to-position3-from-left-CR';
      boxes[4].className = 'boxs move-to-position4-from-left-CR';
      boxes[5].className = 'boxs move-to-position5-from-left-CR';
      boxes[6].className = 'boxs move-to-position6-from-left-CR';
      boxes[0].remove();

      document.querySelector('.cards__container_carousel').appendChild(tmpNode);
      boxes[0].className = 'boxs move-out-from-left-CR';
    }, 0);
    this.animationImage();
    console.log(this.index);
  }
  stopInter() {
    clearInterval(this.windowInterval);
    this.replay();
  }
  animationImage() {
    const element = document.getElementById('imageCR');
    const element2 = document.getElementById('info');
    element2.classList.remove('leftToRightInfo');
    element.classList.remove('fade-in');
    setTimeout(() => {
      element2.classList.add('leftToRightInfo');
      element.classList.add('fade-in');
    }, 0);
  }
  replay() {
    this.windowInterval = window.setInterval(() => {
      this.shiftRight();
    }, 5000);
  }
}
