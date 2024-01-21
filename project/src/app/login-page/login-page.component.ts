import { Component } from '@angular/core';
import { HttpService } from '../http.service';
import { loginUser } from '../loginUser'; 
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css'],
  providers: [HttpService]
})
export class LoginPageComponent {

  loginForm : FormGroup;
  errorMessage: string | undefined;
  constructor(private router: Router, private httpService: HttpService){
    this.loginForm = new FormGroup({
      "Username": new FormControl("",Validators.required),
      "Password": new FormControl("",Validators.required)
    });
  }
  receivedUser: loginUser | undefined;
  done: boolean = false;

  onSubmit(){
    const username = this.loginForm.value.Username;
    const password = this.loginForm.value.Password;
    const token = '';
    const refreshToken ='';
    const user = new loginUser(username, password, token, refreshToken);
    this.httpService.loginPostData(user)
    .subscribe(
      {
        next:(data: any) => {
          this.receivedUser = data; 
          this.done = true; 
          localStorage.setItem("User",JSON.stringify(this.receivedUser?.username));
          localStorage.setItem("Token",JSON.stringify(this.receivedUser?.token));
          localStorage.setItem("RefreshToken",JSON.stringify(this.receivedUser?.refreshToken));
          this.router.navigate(['/table']);},
      })
  }
}
