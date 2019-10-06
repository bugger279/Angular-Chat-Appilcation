import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { RouterModule } from '@angular/router';
// Importing Module for Fonts
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';


@NgModule({
  declarations: [LoginComponent, SignupComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([
      { path: 'sign-up', component: SignupComponent }
    ]),
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [CookieService]
})
export class UserModule { }
