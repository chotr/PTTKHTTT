import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../material/material.module';
import { ShortCutPipe } from './pipes/short-cut.pipe';
import { SafePipe } from './pipes/safe.pipe';




@NgModule({
  declarations: [
    ShortCutPipe,
    SafePipe,
    
  ],
  imports: [
    MaterialModule,
    FormsModule,
    CommonModule,
    ReactiveFormsModule
  ],
  exports: [ShortCutPipe, SafePipe]
})
export class ProviderModule { }