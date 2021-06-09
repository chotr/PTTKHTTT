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
        path: 'user-management',
        component: UserManagementComponent,
      },
      {
        path: '',
        redirectTo: '/admin/dashboard',
      }
    ],
  },
];

@NgModule({
  declarations: [AdminComponent, DashboardComponent, NavbarAdminComponent, UserManagementComponent, MovieManagementComponent, ShowtimesManagementComponent],
  imports: [CommonModule, RouterModule.forChild(routes)],
})
export class AdminModule {}
