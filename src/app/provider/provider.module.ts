import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { MaterialModule } from '../material/material.module';
import { LoginComponent } from './login/login.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { ShortCutPipe } from './pipes/short-cut.pipe';



@NgModule({
  declarations: [
    LoginComponent,
    SignUpComponent,
    ShortCutPipe,
    
  ],
  imports: [
    MaterialModule,
    FormsModule,
    CommonModule,
    ReactiveFormsModule
  ],
  exports: [ShortCutPipe]
})
export class ProviderModule { }
