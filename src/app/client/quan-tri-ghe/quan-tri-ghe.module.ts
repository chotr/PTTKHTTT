import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GheComponent } from './ghe/ghe.component';
import { DsGheComponent } from './ds-ghe/ds-ghe.component';
import { EdtDsGheComponent } from './edt-ds-ghe/edt-ds-ghe.component';

@NgModule({
  declarations: [GheComponent, DsGheComponent, EdtDsGheComponent],
  imports: [CommonModule],
  exports: [GheComponent, DsGheComponent, EdtDsGheComponent],
})
export class QuanTriGheModule {}
