import { Component, OnInit } from '@angular/core';
import { AppService } from 'src/app/app.service';
import { ToastrManager } from 'ng6-toastr-notifications';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {

  constructor(public appService: AppService, public toastr: ToastrManager, public router: Router, public cookie: CookieService) { }

  email: any;
  password: any;

  ngOnInit() {
  }

    /**
   * goToSignUp
   */
  public goToSignUp: any = () => {
    this.router.navigate(['/sign-up']);
  }

  /**
   * login
   */
  public login = () => {
    console.log("btn cli");
    if (!this.email) {
      this.toastr.warningToastr('enter email');
    } else if (!this.password) {
      this.toastr.warningToastr('enter password');
    } else {
      const data = {
        email: this.email,
        password: this.password
      };

      console.log(data);
      this.appService.signinFunction(data).subscribe((apiResponse) => {
        if (apiResponse.status === 200) {
          console.log(apiResponse);
          this.cookie.set('receiverId', apiResponse.data.userDetails.userId);
          this.cookie.set('authToken', apiResponse.data.authToken);
          this.cookie.set('reciverName', apiResponse.data.userDetails.firstName + apiResponse.data.userDetails.lastName);
          this.appService.setUserInfoLocalStorage(apiResponse.data.userDetails.firstName + ' ' + apiResponse.data.userDetails.lastName);
          this.toastr.successToastr('Login Successful!');
          setTimeout(() => {
            this.router.navigate(['/chat']);
            this.toastr.successToastr(`Welcome ${apiResponse.data.userDetails.firstName} ${apiResponse.data.userDetails.lastName}`);
          }, 2000);
        } else {
          this.toastr.errorToastr(apiResponse.message);
        }
      }, (err) => {
        this.toastr.errorToastr('There is some error!');
      });
    }
  }
}
