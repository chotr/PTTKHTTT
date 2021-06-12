import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminComponent } from './admin.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { RouterModule } from '@angular/router';
import { AuthGuard } from '../provider/guards/auth.guard';
import { NavbarAdminComponent } from './layout/navbar-admin/navbar-admin.component';
import { UserManagementComponent } from './user-management/user-management.component';
import { MovieManagementComponent } from './movie-management/movie-management.component';
import { ShowtimesManagementComponent } from './showtimes-management/showtimes-management.component';
import { NavAdminComponent } from './nav-admin/nav-admin.component';
import { ProviderModule } from '../provider/provider.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

const routes = [
  {
    path: '',
    component: AdminComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: 'dashboard',
        component: DashboardComponent,
      },

      {
        path: 'movie-management/:page',
        component: MovieManagementComponent,
      },
      {
        path: 'movie-management',
        redirectTo: 'movie-management/1',
      },
      {
        path: 'user-management/:page',
        component: UserManagementComponent,
      },
      {
        path: 'user-management',
        redirectTo: 'user-management/1',
      },
      {
        path: 'showtimes-management',
        component: ShowtimesManagementComponent,
      },
      {
        path: '',
        redirectTo: '/admin/dashboard',
      },
    ],
  },
];

@NgModule({
  declarations: [
    AdminComponent,
    DashboardComponent,
    NavbarAdminComponent,
    UserManagementComponent,
    MovieManagementComponent,
    ShowtimesManagementComponent,
    NavAdminComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ProviderModule,
    FormsModule,
    ReactiveFormsModule,
  ],
})
export class AdminModule {}
