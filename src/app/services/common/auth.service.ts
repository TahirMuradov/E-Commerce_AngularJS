import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { HttpErrorResponse } from '@angular/common/http';
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
import { SpinnerLoadingService } from '../ui/spinner-loading.service';
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    private jwtHelper: JwtHelperService,
    private http: HttpClientService,
    public customToastrService: CustomToastrService,
    private router: Router,
    public spinner: SpinnerLoadingService
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
    this.spinner.spinerShow();
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
            this.spinner.spinerHide()
          }
        },
        error: (response: HttpErrorResponse) => {
          let errorMessage = '';

          if (Array.isArray(response?.error?.messages)) {
            errorMessage = response?.error?.messages.join('\n');
          } else if (typeof response?.error?.message === 'string') {
            errorMessage = response.error?.message;
          } else {
            errorMessage = JSON.stringify(response.error);
          }
          this.customToastrService.message(errorMessage, 'Error', {
            messageType: ToastrMessageType.Error,
            position: ToastrPosition.TopRight,
          });
          this.spinner.spinerHide();
        },
      });
  }
  signOut() {
   
    const token: string = JSON.parse(
      localStorage.getItem('SessionInfo')
    )?.accessToken;
    if (token) {
   
      this.http.put({ controller: 'Auth', action: 'LogOut' }).subscribe({
      next:(value: ResultResponseType<null>)=> {
        if (value.isSuccess) {
             localStorage.removeItem('SessionInfo');
          this.customToastrService.message("",'Success', {
            messageType: ToastrMessageType.Success,
            position: ToastrPosition.TopRight,
          });
        this.spinner.spinerHide();
        }
      },
      error:(response: HttpErrorResponse)=> {
        let errorMessage = '';
        if (Array.isArray(response?.error?.messages)) {
          errorMessage = response?.error?.messages.join('\n');
        } else if (typeof response?.error?.message === 'string') {
          errorMessage = response.error?.message;
        } else {
          errorMessage = JSON.stringify(response.error);
        }
        
        this.customToastrService.message(errorMessage, 'Error', {
          messageType: ToastrMessageType.Error,
          position: ToastrPosition.TopRight,
        });
      },
    });
    }
  
  }
  register(data: RegisterType) {
   
    this.http.post({ controller: 'Auth', action: 'Register' }, data).subscribe({
      next:(value: ResultResponseType<null>)=> {
        if (value.isSuccess) {
          this.customToastrService.message("",'Success', {
            messageType: ToastrMessageType.Success,
            position: ToastrPosition.TopRight,
          });
        this.spinner.spinerHide();
        }
      },
      error:(response: HttpErrorResponse)=> {
        let errorMessage = '';
        if (Array.isArray(response?.error?.messages)) {
          errorMessage = response?.error?.messages.join('\n');
        } else if (typeof response?.error?.message === 'string') {
          errorMessage = response.error?.message;
        } else {
          errorMessage = JSON.stringify(response.error);
        }
        
        this.customToastrService.message(errorMessage, 'Error', {
          messageType: ToastrMessageType.Error,
          position: ToastrPosition.TopRight,
        });
      },
    });
  }

}

export let _isAuthenticated: boolean;
export let _isRole: RoleEnums;
