import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';
import { HttpClient, HttpHeaders, HttpErrorResponse, HttpParams } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class AppService {

  private url = 'https://chatapi.edwisor.com/api/v1/';

  constructor( public http: HttpClient, public cookie: CookieService ) { }

  // Sign Up Function
  public signupFunction(data): Observable<any> {
    const params = new HttpParams()
      .set('firstName', data.firstName)
      .set('lastName', data.lastName)
      .set('mobile', data.mobile)
      .set('email', data.email)
      .set('password', data.password)
      .set('apiKey', data.apiKey);

    return this.http.post(`${this.url}users/signup`, params);
  }

  // Login Function
  /**
   * signinFunction
   */
  public signinFunction(data): Observable<any> {
    const params = new HttpParams()
      .set('email', data.email)
      .set('password', data.password);

    return this.http.post(`${this.url}users/login`, params);
  }

  /**
   * handleError
   */
  public handleError(error: HttpErrorResponse) {
    const errorMessage = '';
    console.log(errorMessage);
  }

  /**
   * getUserInfoFromLocalStorage
   */
  public getUserInfoFromLocalStorage = () => {
    return JSON.parse(localStorage.getItem('userInfo'));
  }

  /**
   * setUserInfoLocalStorage
   */
  public setUserInfoLocalStorage = (userInfoData) => {
    localStorage.setItem(userInfoData, JSON.stringify(userInfoData));
  }
}
