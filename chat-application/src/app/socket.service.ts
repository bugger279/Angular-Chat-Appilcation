import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse, HttpParams } from '@angular/common/http';

// Importing Socket Packages

import * as io from 'socket.io-client';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class SocketService {
  private url = `https://chatapi.edwisor.com`;
  private socket;

  constructor(private http: HttpClient, public cookie: CookieService) {
    // Creating a connection i.e. Handshake connection type .... From Documentation
    this.socket = io(this.url);
    console.log(cookie.getAll());
  }

  // Events We need to LISTEN Too
  // 1. Verify User
    public verifyUser = () => {
      const verifyUser = Observable.create((observer) => {
        this.socket.on('verifyUser', (data) => {
          observer.next(data);
        });
      });

      // const newVerifyUser = new Observable((observer) => {
      //   this.socket.on('verifyUser', (data) => {
      //     observer.next(data);
      //   });
      // });

      // return newVerifyUser;

      return verifyUser;
    }
  // 2. Online User Lists
    public onlineUserList = () => {
      const onlineUserList = Observable.create((observer) => {
        this.socket.on('online-user-list', (userList) => {
          observer.next(userList);
        });
      });

      return onlineUserList;
    }
  // 3. User Id
  // 4. Error Occurred
  // 5. Disconnect
    public disconnectedSocket = () => {
      const disconnected = Observable.create((observer) => {
        this.socket.on('disconnect', () => {
          observer.next();
        });
      });

      return disconnected;
    }


  // Events We need to EMIT too
  // 1. Set User
    public setUser = (authToken) => {
      this.socket.emit('set-user', authToken);
    }
  // 2. Chat Message
  // 3. Mark as seen

  // Global Error Handler
  private handleError(err: HttpErrorResponse) {
    let errorMessage = '';
    if (err.error instanceof Error) {
      errorMessage = `An Error Occurred: ${err.error.message}`;
    } else {
      errorMessage = `Service returned code: ${err.status}, error message is ${err.error.message}`;
    }
    console.error(errorMessage);
    return Observable.throw(errorMessage);
  }

}
