import { Component } from '@angular/core';
import { HttpService } from '../http.service';
import { registerUser } from '../registerUser'; 
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.css'],
  providers: [HttpService]
})
export class RegisterPageComponent {
  
  registerForm : FormGroup;
  constructor(private router: Router, private httpService: HttpService){
    this.registerForm = new FormGroup({
      "FirstName" : new FormControl("",Validators.required),
      "SecondName" : new FormControl("",Validators.required),
      "Email" : new FormControl("",Validators.required),
      "Username": new FormControl("",Validators.required),
      "Password": new FormControl("",Validators.required)
    });
  }
  receivedUser: registerUser | undefined;
  done: boolean = false;

  onSubmit(){
    const name = this.registerForm.value.FirstName;
    const surname = this.registerForm.value.SecondName;
    const email = this.registerForm.value.Email;
    const username = this.registerForm.value.Username;
    const password = this.registerForm.value.Password;
    const user = new registerUser(name, surname, email, username, password);
    console.log(this.registerForm)
    this.httpService.RegisterPostData(user)
    .subscribe(
      {
        next:(data: any) => {this.receivedUser = data; this.done = true; this.router.navigate(['/login-page'])}
        
  })
  }
}
