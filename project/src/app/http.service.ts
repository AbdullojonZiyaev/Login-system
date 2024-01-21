	
import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { loginUser } from './loginUser';
import {Observable} from 'rxjs';
import { map } from 'rxjs/operators';
import { registerUser } from './registerUser';
import { userInfo } from './userInfo';
   
@Injectable()
export class HttpService{
    
    constructor(private http: HttpClient){ }
        
    loginPostData(loginUser: loginUser){
        const body = {username: loginUser.username, password: loginUser.password}
        return this.http.post('http://localhost:5258/LoginPage',body);
    }
    RegisterPostData(registerUser: registerUser){
        const body = {FirstName : registerUser.FirstName, SecondName : registerUser.SecondName, Email: registerUser.Email, Username: registerUser.Username, Password: registerUser.Password}
        return this.http.post('http://localhost:5258/RegisterPage',body);
    }
    UserInfoGetData(){
        return this.http.get('http://localhost:5258/GetUserInfo');
    }
    refreshTokenPostData( token : string | undefined){
        return this.http.post('http://localhost:5258/RefreshToken?token='+token,token);
    }
}