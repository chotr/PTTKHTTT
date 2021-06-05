import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { MaterialModule } from '../material/material.module';
import { LoginComponent } from './login/login.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { ShortCutPipe } from './pipes/short-cut.pipe';
import { SafePipe } from './pipes/safe.pipe';




@NgModule({
  declarations: [
    LoginComponent,
    SignUpComponent,
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