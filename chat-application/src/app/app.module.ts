import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

// Router and Other Module
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { ChatModule } from './chat/chat.module';
import { UserModule } from './user/user.module';
import { LoginComponent } from './user/login/login.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ng6-toastr-notifications';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    ChatModule,
    UserModule,
    RouterModule.forRoot([
      { path: 'login', component: LoginComponent, pathMatch: 'full' },
      { path: '', redirectTo: 'login', pathMatch: 'full' },
      { path: '*', component: LoginComponent },
      { path: '**', component: LoginComponent }
    ]),
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    HttpClientModule
    ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
