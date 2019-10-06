import { Component } from '@angular/core';
import { ToastrManager } from 'ng6-toastr-notifications';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  constructor(public toastr: ToastrManager) {}

  showSuccess() {
    this.toastr.successToastr('This is success toast.', 'Success!');
  }

}
