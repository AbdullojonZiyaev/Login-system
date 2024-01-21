import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS, HttpClientModule }   from '@angular/common/http';
import {FormsModule} from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations'
import { MatDialogModule } from '@angular/material/dialog';
import { JwtModule } from '@auth0/angular-jwt';

import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { TableComponent } from './table/table.component';
import { RegisterPageComponent } from './register-page/register-page.component';
import { ErrorInterceptor } from './errorInterceptor';
import { UserInfoComponent } from './user-info/user-info.component';
import { ErrorPopupComponent } from './error-popup/error-popup.component';
import { HttpService } from './http.service';

@NgModule({
  declarations: [
    AppComponent,
    LoginPageComponent,
    TableComponent,
    RegisterPageComponent,
    UserInfoComponent,
    ErrorPopupComponent,
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot([
      {path: 'login-page', component: LoginPageComponent},
      {path: 'table', component: TableComponent},
      {path: 'register-page', component: RegisterPageComponent},
      {path: '', redirectTo: "/login-page", pathMatch: 'full'},
      {path: 'user-info', component: UserInfoComponent}
    ]),
    HttpClientModule,
    FormsModule,
    MatDialogModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: () => {
          return localStorage.getItem('Token');
        }
      }
    })
  ],
  providers: [HttpService,
    {provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
