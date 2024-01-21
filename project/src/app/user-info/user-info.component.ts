import { Component } from '@angular/core';
import { loginUser } from '../loginUser';
import { registerUser } from '../registerUser';
import { HttpService } from '../http.service';
import { Router } from '@angular/router';
import { userInfo } from '../userInfo';

@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.css'],
  providers:[HttpService]
})
export class UserInfoComponent {
  username: string | undefined;
  name: string | undefined;
  surname: string | undefined;
  email:string | undefined;
  receivedUser: userInfo | undefined;
  constructor(private httpService: HttpService, private router: Router){}
  
  ngOnInit() {
    this.httpService.UserInfoGetData()
    .subscribe(
      {
        next:(data: any) => {
          this.receivedUser = data;
          this.username = this.receivedUser?.username;
          this.name = this.receivedUser?.firstName;
          this.surname = this.receivedUser?.secondName;
          this.email  = this.receivedUser?.email;
        }
  })
  }
}
