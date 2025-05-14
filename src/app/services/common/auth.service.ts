import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { environment } from '../../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CustomToastrService, ToastrMessageType, ToastrPosition } from '../ui/custom-toastr.service';
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private jwtHelper: JwtHelperService, private http: HttpClient,private customToastrService:CustomToastrService) { }
  identityCheck() {
    const token: string = JSON.parse(localStorage.getItem('SessionInfo')).accessToken ;

    let expired: boolean;
    try {
      expired = this.jwtHelper.isTokenExpired(token);
    } catch {
      expired = true;
    }

    _isAuthenticated = token != null && !expired;
  }
  signIn(email: string, password: string) {
    const loginData = {
      username: email,
      password: password,
        expiresInMins:30
    };

    const token = localStorage.getItem('accessToken');

    const headers: HttpHeaders = new HttpHeaders({
      'Content-Type': 'application/json',
      // ...(token && { Authorization: `Bearer ${token}` }),
  
    });
    const apiUrl = `${environment.apiUrl}/auth/login`;

    this.http.post(apiUrl, loginData, { headers }).subscribe({
      next: (response: any) => {
        console.log('Login Success:', response);
        localStorage.setItem('SessionInfo', JSON.stringify({accessToken:response.accessToken,refreshToke:response.refreshToken}));
        this.identityCheck();
      },
      error: (err) => {
        
        console.log(err)
        this.customToastrService.message(JSON.stringify(err.error.message),"LoginError",{
            messageType: ToastrMessageType.Error,
            position: ToastrPosition.TopRight
          }) },
    });
  }

  get isAuthenticated(): boolean {
    return _isAuthenticated;
  }
}

export let _isAuthenticated: boolean;
