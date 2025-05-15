import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { environment } from '../../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {
  CustomToastrService,
  ToastrMessageType,
  ToastrPosition,
} from '../ui/custom-toastr.service';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root',
})
export class AuthService {

  constructor(
    private jwtHelper: JwtHelperService,
    private http: HttpClient,
    private customToastrService: CustomToastrService,
    private router:Router
  ) { 
    _isAuthenticated=false
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
    const loginData = {
      username: email,
      password: password,
      expiresInMins: 30,
    };

    const apiUrl = `${environment.apiUrl}/auth/login`;

    this.http.post(apiUrl, loginData).subscribe({
      next: (response: any) => {
        localStorage.setItem(
          'SessionInfo',
          JSON.stringify({
            accessToken: response.accessToken,
            refreshToke: response.refreshToken,
          })
        );
        this.identityCheck();
        this.router.navigate(["home"]);
      },
      error: (err) => {
        console.log(err);
        this.customToastrService.message(
          JSON.stringify(err.error.message),
          'LoginError',
          {
            messageType: ToastrMessageType.Error,
            position: ToastrPosition.TopRight,
          }
        );
      },
    });
  }
  signOut(){
      const token: string = JSON.parse(
      localStorage.getItem('SessionInfo')
    )?.accessToken;
    if (token) {
      localStorage.removeItem("SessionInfo")
      this.identityCheck()
    }
  }
}

export let _isAuthenticated: boolean;
