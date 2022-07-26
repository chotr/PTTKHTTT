import {
  AfterViewInit,
  Component,
  HostListener,
  OnInit,
  ViewChild,
} from '@angular/core';
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
export class HomeComponent implements OnInit, AfterViewInit {
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
      image: '../../../assets/imageMV/nguoi-tinh.jpg',
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
      name: 'Chia Khoá Trăm Tỷ',
      image: '../../../assets/imageMV/image_chiaKhoaTramTy.jpg',
      moTa: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Reprehenderit illo nobis a rerum quae tenetur sint quas dolor maiores unde officia, quo nulla minus voluptatum eligendi illum voluptatem quisquam iste.Aut, sequi veniam possimus natus consequuntur accusantium alias recusandae cum fuga. Ipsam obcaecati temporibus atque aliquid quos. Pariatur minima aspernatur quis, id, possimus repellendus odio porro recusandae perferendis iste harum.',
      bgImage: '../../../assets/imageMV/banner_chiaKhoaTramTy.jpg',
      biDanh: '',
      ngayCHieu: '',
    },
  ];
  dsRap = [{ maPhim: null, tenHeThongRap: 'Vui lòng chọn phim' }];
  dsCR = [{ maCR: null, tenCR: 'Vui lòng chọn rạp phim' }];
  dsLC = [{ maLC: null, ngayChieu: 'Vui lòng chọn cụm rạp phim' }];
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
  selected: number;
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
  ngAfterViewInit(): void {
    this.setTarget();
    // this.chooseItem();
  }

  ngOnInit(): void {
    this.moviesService.getDataMovies().subscribe((res) => {
      if (res) {
        this.hideloader();
        this.listMovie = res.slice(10, 20);
      } else {
        this.listMovie = [{ maPhim: null, tenPhim: 'Không có phim' }];
      }
    });

    this.getInfo(0);
    this.stopInter();
  }

  getMaPhim(maPhim, tenPhim): void {
    this.tenRap = 'Chọn rạp ...';
    this.cumRap = 'Chọn cụm rạp ...';
    this.lc = 'Chọn giờ chiếu ...';
    this.dsRap = [{ maPhim: null, tenHeThongRap: 'Vui lòng chọn phim' }];
    this.dsCR = [{ maCR: null, tenCR: 'Vui lòng chọn rạp phim' }];
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
    this.dsRap = listTemp;
  }

  maRapNull() {
    if (this.dsRap == null) {
      this.dsRap = [{ maPhim: null, tenHeThongRap: 'Vui lòng chọn phim' }];
      document.getElementById('menuR').style.pointerEvents = 'none';
    } else if (this.dsRap != null) {
      document.getElementById('menuR').style.pointerEvents = 'auto';
    }
  }

  maCumRapNull() {
    if (this.dsCR[0].maCR === null) {
      this.dsCR = [{ maCR: null, tenCR: 'Vui lòng chọn rạp phim' }];
      document.getElementById('menuCR').style.pointerEvents = 'none';
    } else if (this.dsCR[0].maCR !== null) {
      document.getElementById('menuCR').style.pointerEvents = 'auto';
    }
  }

  maPhimNull() {
    if (this.dsLC[0].maLC === null) {
      this.dsLC = [{ maLC: null, ngayChieu: 'Vui lòng chọn cụm rạp phim' }];
      document.getElementById('menuPhim').style.pointerEvents = 'none';
    } else if (this.dsLC[0].maLC !== null) {
      document.getElementById('menuPhim').style.pointerEvents = 'auto';
    }
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

    this.dsLC = listTemp;
  }

  getMaLC(maLC: any, ngayChieu): void {
    let gioChieu = ngayChieu.split('T');
    let gioChieuHHmm = gioChieu[1].split(':');
    this.maLC = maLC;
    this.lc = gioChieuHHmm[0] + ':' + gioChieuHHmm[1];
    if (this.maLC !== 'Chọn giờ chiếu ...') {
      this.disabledT = true;
    }
  }

  formatTime(ngayChieu: string): string {
    let gioChieu = ngayChieu.slice(11, 16);
    if (this.dsLC[0].maLC !== null) {
      return gioChieu;
    } else if (this.dsLC[0].maLC === null) {
      return ngayChieu;
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

  // carousel part code
  getInfo(index) {
    this.image = this.listNewMovie[index].image;
    this.name = this.listNewMovie[index].name;
    this.bg_image = this.listNewMovie[index].bgImage;
    this.biDanh = this.listNewMovie[index].biDanh;
    this.description = this.listNewMovie[index].moTa;
    this.ngayCHieu = this.listNewMovie[index].ngayCHieu;
  }
  shiftLeft() {
    const boxes = document.querySelectorAll('.boxs');

    if (this.index > 0) {
      this.index = this.index - 1;
    } else {
      this.index = 6;
    }
    this.getInfo(this.index);

    setTimeout(() => {
      const noOfCards = boxes.length;
      if (noOfCards > 6) {
        boxes[6].className = 'boxs box--hide';
      }

      const tmpNode = boxes[noOfCards - 1];
      tmpNode.classList.remove('boxs--hide');
      boxes[noOfCards - 1].remove();
      let parentObj = document.querySelector('.cards__container_carousel');
      parentObj.insertBefore(tmpNode, parentObj.firstChild);
      tmpNode.className = 'boxs move-to-position1-from-right-CR';
      boxes[0].className = 'boxs move-to-position2-from-right-CR';
      boxes[1].className = 'boxs move-to-position3-from-right-CR';
      boxes[2].className = 'boxs move-to-position4-from-right-CR';
      boxes[3].className = 'boxs move-to-position5-from-right-CR';
      boxes[4].className = 'boxs move-to-position6-from-right-CR';
      boxes[5].className = 'boxs move-to-position7-from-right-CR';
      boxes[6].className = 'boxs move-to-position1-from-right-CR';
    }, 0);
    // this.shiftRight();
    this.animationImage();
  }
  shiftRight() {
    const boxes = document.querySelectorAll('.boxs');
    const tmpNode = boxes[0];
    let url = this.router.url;
    if (url !== '/client/home' && url !== '/home') {
      return clearTimeout(this.windowInterval);
    }
    let idP = boxes[1].getAttribute('data-target');
    this.getInfo(idP);

    setTimeout(() => {
      if (boxes.length > 6) {
        tmpNode.classList.add('boxs--hide');
        boxes[6].className = 'boxs move-to-position7-from-left-CR';
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
  }
  stopInter() {
    clearTimeout(this.windowInterval);
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
    this.windowInterval = window.setTimeout(() => {
      this.shiftRight();
      this.stopInter();
    }, 5000);
  }
  setTarget() {
    const number = document.querySelectorAll('.boxs').length;
    for (let i = 0; i < number; i++) {
      //remove and set data
      let boxes = document.querySelectorAll('.boxs');
      boxes.item(i).removeAttribute('data-target');
      boxes.item(i).setAttribute('data-target', i.toString());
    }
  }
  // chooseItem() {
  //   const number = document.querySelectorAll('.boxs').length;
  //   let selected = 0;
  //   for (let i = 0; i < number; i++) {
  //     let boxes = document.querySelectorAll('.boxs');
  //     boxes[i].addEventListener('click', () => {
  //       this.setTarget();
  //       let active = boxes[i].getAttribute('data-target');
  //       let idFilm = boxes[i].getAttribute('data-id');
  //       selected = parseInt(active);
  //       this.setMovie(parseInt(idFilm));
  //       this.setContent(selected);
  //       console.log(selected);
  //     });
  //   }
  // }

  addChild(child) {
    document
      .querySelector('.boxs')
      .closest('.cards__container_carousel')
      .appendChild(child);
  }

  setContent(selected: number) {
    const number = document.querySelectorAll('.boxs').length;

    for (let index = 0; index < number; index++) {
      let boxs = document.querySelectorAll('.boxs');

      if (index === selected) {
        boxs[index].className = 'boxs position-item-' + index + '-move';
      } else if (index > selected) {
        boxs[index].className = 'boxs position-item-' + index + '-move-behind';
      } else if (index < selected) {
        let temp = document.querySelectorAll('.boxs')[index];
        let temp1 = document.querySelectorAll('.boxs')[index];
        boxs[index].className =
          'boxs position-item-' + (index + 1) + '-move-FO';
        this.addChild(temp1);
        //let temp = document.querySelectorAll('.boxs')[index];
        //let temp1 = document.querySelectorAll('.boxs')[index];
        // let temp1 = boxs[index];
        //document.querySelector('.cards__container_carousel').appendChild(temp1);
        //temp1.className = 'boxs position-item-' + temp1 + '-move-after';

        setTimeout(() => {
          // console.log(temp);
          // console.log("/////////////");
          // console.log(temp1);
          // temp.remove();
          function test() {
            let res = 0;
            for (let i = 0; i <= 100000; i++) {
              res++;
            }
            return 'Fist';
          }
          console.log(test());
          console.log('Later');
          // document
          //   .querySelector('.cards__container_carousel')
          //   .appendChild(temp);
          // // boxs[index].className = 'boxs';
          // temp.className = 'boxs position-item-' + temp + '-move-after';
        }, 5000);
        // this.setTarget();
      }
    }
    // for (let index = 0; index < number; index++) {
    //   if(index < selected){
    //     let temp1 = document.querySelectorAll('.boxs')[index];
    //     document.querySelector('.cards__container_carousel').appendChild(temp1);
    //   }
    // }
  }
}
