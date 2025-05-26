import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import {
  HttpClient,
  HttpErrorResponse,
  HttpResponse,
} from '@angular/common/http';
import {
  CustomToastrService,
  ToastrMessageType,
  ToastrPosition,
} from '../ui/custom-toastr.service';
import { Router } from '@angular/router';
import ResultResponseType from '../../models/responseType/ResultResponseType';
import TokenType, {
  DecodedToken,
} from '../../models/responseType/authResponseType/TokenType';
import { HttpClientService } from './http-client.service';
import { RoleEnums } from '../../models/enums/RoleEnums';
import RegisterType from '../../models/responseType/authResponseType/RegisterType';
import { TranslateService } from '@ngx-translate/core';
import UpdateForgotPassword from '../../models/DTOs/UpdateForgotPassword';
import { map, Observable, of } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    private jwtHelper: JwtHelperService,
    private http: HttpClientService,
    private router: Router,
  
  ) {
    (_isAuthenticated = false), (_isRole = RoleEnums.User);
  }

  get isAuthenticated(): boolean {
    return _isAuthenticated;
  }
  get isRole(): RoleEnums {
    return _isRole;
  }
  identityCheck() {
    let token: string = null;
    let expired: boolean;

    if (typeof window !== 'undefined') {
      token = JSON.parse(localStorage.getItem('SessionInfo'))?.accessToken;

      try {
        expired = this.jwtHelper.isTokenExpired(token);
      } catch {
        expired = false;
      }
      if (expired && token) {
        const tokenDecode: DecodedToken = this.jwtHelper.decodeToken(token);
        console.log(tokenDecode);
        if (tokenDecode.Roles.includes(RoleEnums.SuperAdmin)) {
          _isRole = RoleEnums.SuperAdmin;
        } else if (tokenDecode.Roles.includes(RoleEnums.Admin)) {
          _isRole = RoleEnums.Admin;
        } else {
          _isRole = RoleEnums.User;
        }
      }
    }

    _isAuthenticated = token != null && !expired;
  }
  signIn(email: string, password: string) {
    this.http
      .post<ResultResponseType<TokenType>, { email: string; password: string }>(
        { controller: 'Auth', action: 'Login' },
        { email: email, password: password }
      )
      .subscribe({
        next: (response: ResultResponseType<TokenType>) => {
          if (response?.isSuccess) {
            localStorage.setItem('SessionInfo', JSON.stringify(response?.data));
            this.identityCheck();
            this.router.navigate(['home']);
          }
        },
   
      });
  }
  signOut() {
    const token: string = JSON.parse(
      localStorage.getItem('SessionInfo')
    )?.accessToken;
    if (token) {
      this.http.put({ controller: 'Auth', action: 'LogOut' }).subscribe({
        next: (value: ResultResponseType<null>) => {
          if (value.isSuccess) {
            localStorage.removeItem('SessionInfo');
      
             this.router.navigate(['/auth/login']);
          }
        },
    
      });
    }
  }
  register(data: RegisterType) {
    this.http.post({ controller: 'Auth', action: 'Register' }, data).subscribe({
      next: (value: ResultResponseType<null>) => {
        console.log(value)
        if (value.isSuccess) {
          

           this.router.navigate(['/auth/login']);
        }
      },
 
    });
  }
  checkEmailConfirmationToken(queryToken:string,queryEmail:string){
  
    if (queryToken && queryEmail) {
          this.http.put<
            ResultResponseType<null>,
            { email: string; token: string }
          >(
            { controller: 'Auth', action: 'ChecekdConfirmedEmailToken' },
            { email:queryEmail, token:queryToken}
          ).subscribe({
            next:(response)=>{
if (response.isSuccess) {
  
  this.router.navigate(["/auth/login"])
}
            }
          });
        }

  }
  forgotPassword(email: string) {
    this.http
      .put<ResultResponseType<null>, null>({
        controller: 'Auth',
        action: 'SendEmailTokenForForgotPassword',
        queryString: `email=${email}`,
      })
      .subscribe({
        next: (value: ResultResponseType<null>) => {
          if (value.isSuccess) {
       
             this.router.navigate(['/auth/login']);
          }
        },
   
      });
  }
checkTokenForForgotPassword(queryEmail: string, queryToken: string): Observable<boolean> {
  if (queryEmail && queryToken) {
    return this.http.get<ResultResponseType<null>>({
      controller: "Auth",
      action: "CheckTokenForForgotPassword",
      queryString: `email=${encodeURIComponent(queryEmail)}&token=${encodeURIComponent(queryToken)}`
    }).pipe(
      map(response => response.isSuccess)
    );
  } else {
    return of(false);
  }
}
  changeForgotPassword(
    email: string,
    token: string,
    newPassword: string,
    confirmNewPassword: string
  ) {
    this.http.put<ResultResponseType<null>, UpdateForgotPassword>(
      { controller: 'Auth', action: 'ChangePasswordForTokenForgotPassword' },
      {
        email: email,
        token: token,
        newPassword: newPassword,
        NewConfirmPassword: confirmNewPassword,
      }
    ).subscribe({
         next: (value: ResultResponseType<null>) => {
        if (value.isSuccess) {
     
           this.router.navigate(['/auth/login']);
        }
      },
   
    });
  }
}

export let _isAuthenticated: boolean;
export let _isRole: RoleEnums;
