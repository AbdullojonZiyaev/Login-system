import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { ErrorPopupComponent } from './error-popup/error-popup.component';
import { JwtHelperService } from '@auth0/angular-jwt'; // Import the JwtHelperService
import { HttpService } from './http.service';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  errorMessage : string | undefined;
  receivedData : string | undefined;
  sendingToken : string | undefined;
  constructor(private router: Router, private matDialog: MatDialog, private jwtHelper: JwtHelperService, private httpService: HttpService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // Get the token from wherever it's stored (e.g., local storage)
    let token = localStorage.getItem('Token');
    const refreshToken = localStorage.getItem('RefreshToken')

    // If token is available and not expired
    if (this.jwtHelper.isTokenExpired(token)){ 
      if (this.jwtHelper.isTokenExpired(refreshToken)){
        this.errorMessage = "token expired";
        this.router.navigate(['/login-page'])
        localStorage.clear()
      }
      else{
        this.sendingToken = token?.substring(1,token.length-1);
        this.httpService.refreshTokenPostData(this.sendingToken).
        subscribe(
          {
            next:(data: any) => {
            this.receivedData = data;
        }
          }
        )
      }
    }
    if (this.receivedData != null){
      token = this.receivedData;
      localStorage.setItem('Token', JSON.stringify(token));
    }
      // Clone the request and add the token as an Authorization header
      const authReq = request.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`
        }
      });

      return next.handle(authReq).pipe(
        catchError((error: HttpErrorResponse) => {
          // Your error handling logic here
          let errorMessage = this.errorMessage;

          // Customize error message based on error status code or other conditions
          if (error.status === 404) {
            errorMessage = 'Resource not found';
          } else if (error.status === 401) {
            errorMessage = 'Unauthorized';
          } else if (error.status === 500) {
            errorMessage = 'Internal server error';
          }

          this.matDialog.open(ErrorPopupComponent, {
            width: '300px',
            data: { message: errorMessage }
          });
          return throwError(errorMessage);
        })
      );
  }
}