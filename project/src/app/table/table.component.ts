import { Component, OnInit } from '@angular/core';
import { LoginPageComponent } from '../login-page/login-page.component';
import { loginUser } from '../loginUser';
import { JwtHelperService } from '@auth0/angular-jwt';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {
  username: string | undefined;

  ngOnInit() {
    const UserNameString = localStorage.getItem('User');
    if (UserNameString) {
      const logedUser = JSON.parse(UserNameString) as string;
      this.username = logedUser;
    }
  }
  onSubmit(){
    localStorage.clear();
  }
}