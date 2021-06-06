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
import { LayoutComponent } from './layout/layout.component';
import { HomeComponent } from './home/home.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {MatPaginatorModule} from '@angular/material/paginator';
import { UserComponent } from './user/user.component';
import { LoginAugthGuard } from '../provider/guards/login-augth.guard';
import { UserAcessGuard } from '../provider/guards/user-acess.guard';
import { DsGheComponent } from './quan-tri-ghe/ds-ghe/ds-ghe.component';


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
        path: 'danhSachGhe',
        component: DsGheComponent,
        canActivate: [UserAcessGuard],
      },
      
      
      {
        path: 'movies/Page/'+':page',
        component: MoviesComponent,
      },
      {
        path: 'movies/Page',
        redirectTo: 'movies/Page/1'
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
    LayoutComponent,
    HomeComponent,
    UserComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ProviderModule,
    NgxPaginationModule,
    JwPaginationModule,
    NgbModule,
    MatPaginatorModule
    // PipesModule
  ],
  exports: [ClientComponent, HomeComponent],
})
export class ClientModule {}
