import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { environment } from '../../../environments/environment';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import {
  CustomToastrService,
  ToastrMessageType,
  ToastrPosition,
} from '../ui/custom-toastr.service';
import { Router } from '@angular/router';
import ResultResponseType from '../../models/responseType/ResultResponseType';
import TokenType from '../../models/responseType/authResponseType/TokenType';
import { HttpClientService } from './http-client.service';
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    private jwtHelper: JwtHelperService,
    private http: HttpClientService,
    private customToastrService: CustomToastrService,
    private router: Router
  ) {
    _isAuthenticated = false;
  }

  get isAuthenticated(): boolean {
    return _isAuthenticated;
  }

  identityCheck() {
    const token: string = JSON.parse(
      localStorage.getItem('SessionInfo')
    )?.accessToken;

    let expired: boolean;
    try {
      expired = this.jwtHelper.isTokenExpired(token);
    } catch {
      expired = false;
    }

    _isAuthenticated = token != null && !expired;
  }
  signIn(email: string, password: string) {
    this.http
      .post<ResultResponseType<TokenType>,{email:string,password:string}>(
        { controller: 'Auth', action: 'Login' },
        { email: email, password: password }
      )
      .subscribe({
next:(response:ResultResponseType<TokenType>)=>{
if (response?.isSuccess) {

 localStorage.setItem(
          'SessionInfo',
          JSON.stringify(response?.data)
        );
        this.identityCheck();
        this.router.navigate(["home"]);

         
}
},
error:(response:HttpErrorResponse)=>{
 let errorMessage = '';

  if (Array.isArray(response?.error?.messages)) {
    errorMessage = response?.error?.messages.join('\n');
  }
  
  else if (typeof response?.error?.message === 'string') {
    errorMessage = response.error?.message;
  }
 
  else {
    errorMessage = JSON.stringify(response.error);
  }
  this.customToastrService.message(errorMessage,"Error",{
    messageType:ToastrMessageType.Error,
    position:ToastrPosition.TopRight
  })
}

      });
  }
  signOut() {
    const token: string = JSON.parse(
      localStorage.getItem('SessionInfo')
    )?.accessToken;
    if (token) {
      localStorage.removeItem('SessionInfo');
      this.identityCheck();
    }
  }
}

export let _isAuthenticated: boolean;
