import { Component, OnInit } from '@angular/core';
import { AppService } from 'src/app/app.service';
import { SocketService } from 'src/app/socket.service';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { ToastrManager } from 'ng6-toastr-notifications';

@Component({
  selector: 'app-chat-box',
  templateUrl: './chat-box.component.html',
  styleUrls: ['./chat-box.component.css'],
  providers: [SocketService]
})
export class ChatBoxComponent implements OnInit {

  authToken: any;
  userInfo: any;
  receiverId: any;
  receiverName: any;
  userList: any[] = [];
  disconnected: boolean;

  constructor(public AppService: AppService, public SocketService: SocketService, public router: Router, public toastr: ToastrManager, public cookie: CookieService) {
    this.receiverId = this.cookie.get('receiverId');
    this.receiverName = this.cookie.get('reciverName');
  }

  ngOnInit() {
    this.authToken = this.cookie.get('authToken');
    // console.log(`AuthToken: ${this.authToken}`);

    this.userInfo = this.AppService.getUserInfoFromLocalStorage();
    console.log(this.userInfo);

    this.checkStatus();

  }

  /**
   * checkStatus
   */
  public checkStatus: any = () => {
    if (this.cookie.get('authToken') === undefined || this.cookie.get('authToken') === '' || this.cookie.get('authToken') === null) {
      this.router.navigate(['/']);
      return false;
    } else {
      return true;
    }
  }

/**
 * verifyUserConfirmation
 */
public verifyUserConfirmation: any = () => {
  this.SocketService.verifyUser().subscribe((data) => {
    this.disconnected = false;
    this.SocketService.setUser(this.authToken);
    this.getOnlineUserList();
  });
}

/**
 * getOnlineUserList
 */
public getOnlineUserList: any = () => {
  this.SocketService.onlineUserList().subscribe((userList) => {
    this.userList = [];

    // tslint:disable-next-line: forin
    for (const x in userList) {
      const temp = { userId: x, name: userList[x], unread: 0, chatting: false };
      this.userList.push(temp);
    }
    console.log(this.userList);
  });
}

}
