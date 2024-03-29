import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClientComponent } from './client.component';
import { RouterModule } from '@angular/router';
import { MoviesComponent } from './movies/movies.component';
import { CardMovieComponent } from './card-movie/card-movie.component';
import { PageNotFoundComponent } from '../page-not-found/page-not-found.component';
import { DetailMovieComponent } from './detail-movie/detail-movie.component';
import { ProviderModule } from '../provider/provider.module';
import { NgxPaginationModule } from 'ngx-pagination';
import { JwPaginationModule } from 'jw-angular-pagination';
import { HomeComponent } from './home/home.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MatPaginatorModule } from '@angular/material/paginator';
import { UserComponent } from './user/user.component';
import { LoginAugthGuard } from '../provider/guards/login-augth.guard';
import { UserAcessGuard } from '../provider/guards/user-acess.guard';
import { DsGheComponent } from './quan-tri-ghe/ds-ghe/ds-ghe.component';
import { MaterialModule } from '../material/material.module';
import { LoginComponent } from './login/login.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { DeactiveGuard } from '../provider/guards/deactive.guard';
import { NavbarComponent } from '../layout/navbar/navbar.component';
import { CinemasComponent } from './cinemas/cinemas.component';
import { ModalComponent } from './user/modal/modal.component';
import { PassModalComponent } from './user/pass-modal/pass-modal.component';
import { ShowtimeComponent } from './showtime/showtime.component';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { HistoryBookingComponent } from './history-booking/history-booking.component';
import { BrowserModule } from '@angular/platform-browser';
import { FooterComponent } from '../layout/footer/footer.component';
import { DetailCinemaComponent } from './detail-cinema/detail-cinema.component';
import { ComingComponent } from './coming/coming.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PipesModule } from '../provider/pipes/pipes.module';

const routes = [
  {
    path: '',
    component: ClientComponent,
    children: [
      {
        path: 'home',
        component: HomeComponent,
      },
      {
        path: 'user',
        component: UserComponent,
        canActivate: [UserAcessGuard],
      },
      {
        path: 'lichSuDatVe',
        component: HistoryBookingComponent,
        canActivate: [UserAcessGuard],
      },

      {
        path: 'danhSachGhe/:id',
        component: DsGheComponent,
        canActivate: [UserAcessGuard],
      },
      {
        path: 'login',
        component: LoginComponent,
        // canActivate: [UserAcessGuard],
        canActivate: [LoginAugthGuard],
      },

      {
        path: 'sign-up',
        component: SignUpComponent,
        canDeactivate: [DeactiveGuard],
        canActivate: [LoginAugthGuard],
      },
      {
        path: 'detail/:id',
        component: DetailCinemaComponent
      },

      {
        path: 'movies/Page/' + ':page',
        component: MoviesComponent,
      },
      {
        path: 'movies/Page',
        redirectTo: 'movies/Page/1',
      },
      {
        path: 'detail-movie/',
        component: DetailMovieComponent,
      },
      {
        path: 'detail-movie/:idMovie',
        component: DetailMovieComponent,
      },
      {
        path: '',
        redirectTo: 'home',
      },
      { path: '**', component: PageNotFoundComponent },
    ],
  },
];

@NgModule({
  declarations: [
    ClientComponent,
    MoviesComponent,
    CardMovieComponent,
    DetailMovieComponent,
    HomeComponent,
    UserComponent,
    LoginComponent,
    SignUpComponent,
    NavbarComponent,
    CinemasComponent,
    ModalComponent,
    PassModalComponent,
    ShowtimeComponent,
    HistoryBookingComponent,
    FooterComponent,
    DetailCinemaComponent,
    ComingComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ProviderModule,
    NgxPaginationModule,
    JwPaginationModule,
    NgbModule,
    MatPaginatorModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    CarouselModule,
    PipesModule
  ],
  exports: [ClientComponent, HomeComponent],
})
export class ClientModule {}
