import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminModule } from './admin/admin.module';
import { ClientModule } from './client/client.module';
import { MoviesComponent } from './client/movies/movies.component';
import { NavbarComponent } from './layout/navbar/navbar.component';
import { DayOneComponent } from './lesson/day-one/day-one.component';
import { DayThreeComponent } from './lesson/day-three/day-three.component';
import { DayTwoComponent } from './lesson/day-two/day-two.component';
import { LessonComponent } from './lesson/lesson.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { DeactiveGuard } from './provider/guards/deactive.guard';
import {LoginComponent} from './provider/login/login.component';
import { ProviderModule } from './provider/provider.module';
import { SignUpComponent } from './provider/sign-up/sign-up.component';

const routes: Routes = [
  {
    path: 'lesson',
    component: LessonComponent,
  },
  {
    path: 'lesson1',
    component: DayOneComponent,
  },
  {
    path: 'lesson2',
    component: DayTwoComponent,
  },
  {
    path: 'lesson3',
    component: DayThreeComponent,
  },
  {
    path: '',
    component: LessonComponent,
  },
  
  {
    path: 'admin',
    loadChildren: () => AdminModule,
  },
  {
    path: 'client',
    loadChildren: () => ClientModule,
  },
  {
    path:'login',
    component: LoginComponent,
    
  },
  {
    path:'sign-up',
    component: SignUpComponent,
    canDeactivate: [DeactiveGuard]
  },

  {
    path: '**',
    component: PageNotFoundComponent,
  },
];

@NgModule({
  
  imports: [RouterModule.forRoot(routes), ProviderModule],
  exports: [RouterModule],
})
export class AppRoutingModule {}
