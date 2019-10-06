import { Component, OnInit } from '@angular/core';
import { ToastrManager } from 'ng6-toastr-notifications';
import { AppService } from 'src/app/app.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  public firstName: any;
  public lastName: any;
  public mobile: any;
  public email: any;
  public password: any;
  public apiKey: any;

  constructor(public appService: AppService, public toastr: ToastrManager, public router: Router) { }

  ngOnInit() {
  }

  /**
   * goToSignIn
   */
  public goToSignIn = () => {
    this.router.navigate(['/']);
  }

  /**
   * signUpFunction
   */
  public signupFunction = () => {

    if (!this.firstName) {
      this.toastr.warningToastr('enter first name');
    } else if (!this.lastName) {
      this.toastr.warningToastr('enter last name');

    } else if (!this.mobile) {
      this.toastr.warningToastr('enter mobile');

    } else if (!this.email) {
      this.toastr.warningToastr('enter email');

    } else if (!this.password) {
      this.toastr.warningToastr('enter password');
    } else if (!this.apiKey) {
      this.toastr.warningToastr('Enter your API key');
    } else {
      let data = {
        firstName: this.firstName,
        lastName: this.lastName,
        mobile: this.mobile,
        email: this.email,
        password: this.password,
        apiKey: this.apiKey
      };
      console.log(data);
      this.appService.signupFunction(data).subscribe((apiResponse) => {
          console.log(apiResponse);
          if (apiResponse.status === 200) {
            this.toastr.successToastr('Signup successful');
            setTimeout(() => {
              this.goToSignIn();
            }, 2000);
          } else {
            this.toastr.errorToastr(apiResponse.message);
          }
        }, (err) => {
          this.toastr.errorToastr('some error occured');
        });
    } // end condition
  } // end signupFunction
}
