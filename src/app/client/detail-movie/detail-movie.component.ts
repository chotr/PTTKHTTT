import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MovieService } from '../services/movie.service';

@Component({
  selector: 'app-detail-movie',
  templateUrl: './detail-movie.component.html',
  styleUrls: ['./detail-movie.component.scss'],
})
export class DetailMovieComponent implements OnInit {
  @ViewChild('iframe') iframe: ElementRef;
  url: string = ''


  detailMovie: any;
  id: string | null | undefined;

  // public YT: any;
  // public video: any;
  // public player: any;
  // public reframed: Boolean = false;

  // isRestricted = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

  constructor(
    private activatedRoute: ActivatedRoute,
    private movieSer: MovieService
  ) {}

  // init() {
  //   var tag = document.createElement('script');
  //   tag.src = 'http://www.youtube.com/iframe_api';
  //   var firstScriptTag = document.getElementsByTagName('script')[0];
  //   firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

    /* startVideo() create an <iframe>  */
    // window['onYouTubeIframeAPIReady'] = () => this.startVideo();
  // }

  ngOnInit(): void {
    this.id = this.activatedRoute.snapshot.paramMap.get('idMovie') as string;
    if (!this.id) {
      this.getParamsFromUrl();
    }
    this.getDataMovie(this.id);
  }
  getParamsFromUrl() {
    this.activatedRoute.queryParams.subscribe((res) => {
      if (res) {
        this.detailMovie = res.maPhim;
      }
    });
  }
  getDataMovie(idMovie: string) {
    this.movieSer.getDetailMovie(idMovie).subscribe((res) => {
      if (res) {
        this.detailMovie = res;
        let trailer = this.detailMovie.trailer;
        this.url = trailer
        // trailer = trailer.split('embed/');
        // this.video = trailer[1];
        // this.init();
      }
    });
  }

  // startVideo() {
  //   this.reframed = false;
  //   this.player = new window['YT'].Player('player', {
  //     videoId: this.video,
  //     playerVars: {
  //       autoplay: 0,
  //       modestbranding: 1,
  //       controls: 1,
  //       disablekb: 1,
  //       rel: 0,
  //       showinfo: 0,
  //       fs: 0,
  //       playsinline: 1,
  //     },
  //     events: {
  //       onStateChange: this.onPlayerStateChange.bind(this),
  //       onError: this.onPlayerError.bind(this),
  //       // auto play video
  //       // 'onReady': this.onPlayerReady.bind(this),
  //     },
  //   });
  // }

  // onPlayerReady(event) {
  //   if (this.isRestricted) {
  //     event.target.mute();
  //     event.target.playVideo();
  //   } else {
  //     event.target.playVideo();
  //   }
  // }

  // /* API  call this function when Player State changes like PLAYING, PAUSED, ENDED */
  // onPlayerStateChange(event) {
  //   console.log(event);
  //   switch (event.data) {
  //     case window['YT'].PlayerState.PLAYING:
  //       if (this.cleanTime() == 0) {
  //         console.log('started ' + this.cleanTime());
  //       } else {
  //         console.log('playing ' + this.cleanTime());
  //       }
  //       break;
  //     case window['YT'].PlayerState.PAUSED:
  //       if (this.player.getDuration() - this.player.getCurrentTime() != 0) {
  //         console.log('paused' + ' @ ' + this.cleanTime());
  //       }
  //       break;
  //     case window['YT'].PlayerState.ENDED:
  //       console.log('ended ');
  //       break;
  //   }
  // }

  // cleanTime() {
  //   return Math.round(this.player.getCurrentTime());
  // }

  // onPlayerError(event) {
  //   switch (event.data) {
  //     case 2:
  //       console.log('' + this.video);
  //       break;
  //     case 100:
  //       break;
  //     case 101 || 150:
  //       break;
  //   }
  // }
}
