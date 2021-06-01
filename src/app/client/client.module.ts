import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClientComponent } from './client.component';
import { AboutUsComponent } from './about-us/about-us.component';
import { RouterModule } from '@angular/router';
import { MoviesComponent } from './movies/movies.component';
import { CardMovieComponent } from './card-movie/card-movie.component';
import { PageNotFoundComponent } from '../page-not-found/page-not-found.component';
import { DetailMovieComponent } from './detail-movie/detail-movie.component';
import { ProviderModule } from '../provider/provider.module';
import { NgxPaginationModule } from 'ngx-pagination';
import { JwPaginationModule } from 'jw-angular-pagination';


const routes = [
  {
    path: '',
    component: ClientComponent,
    children: [
      {
        path: 'about-us',
        component: AboutUsComponent,
      },
      {
        path: 'movies',
        component: MoviesComponent,
      },
      {
        path: 'detail-movie/',
        component: DetailMovieComponent,
      },
      {
        path: 'detail-movie/:idMovie',
        component: DetailMovieComponent,
      },

      { path: '**', component: PageNotFoundComponent },
    ],
  },
];



@NgModule({
  declarations: [
    ClientComponent,
    AboutUsComponent,
    MoviesComponent,
    CardMovieComponent,
    DetailMovieComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ProviderModule,
    NgxPaginationModule,
    JwPaginationModule
    // PipesModule
  ],
  exports: [ClientComponent],
})
export class ClientModule {}
