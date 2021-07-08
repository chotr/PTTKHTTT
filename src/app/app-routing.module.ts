import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminModule } from './admin/admin.module';
import { ClientModule } from './client/client.module';
import { HomeComponent } from './client/home/home.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { ProviderModule } from './provider/provider.module';

const routes: Routes = [
  {
    path: 'admin',
    loadChildren: () => AdminModule,
  },
  {
    path: 'client',
    loadChildren: () => ClientModule,
  },
  {
    path: 'client/home',
    // redirectTo: '/client',
    component: HomeComponent,
  },
  { 
    path: '',
    loadChildren: () => ClientModule,
  },


  {
    path: '**',
    component: PageNotFoundComponent,
  },
];

@NgModule({
  
  imports: [RouterModule.forRoot(routes, { anchorScrolling: 'enabled'}), ProviderModule],
  exports: [RouterModule],
})
export class AppRoutingModule {}
