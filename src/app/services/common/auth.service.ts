import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Router } from '@angular/router';
import ResultResponseType from '../../models/responseType/ResultResponseType';
import TokenType, {
  DecodedToken,
} from '../../models/responseType/authResponseType/TokenType';
import { HttpClientService } from './http-client.service';
import { RoleEnums } from '../../models/enums/RoleEnums';
import RegisterType from '../../models/responseType/authResponseType/RegisterType';
import UpdateForgotPassword from '../../models/DTOs/UpdateForgotPassword';
import { map, Observable, of } from 'rxjs';
import GetCurrentUserType from '../../models/responseType/authResponseType/GetCurrentUserType';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    private jwtHelper: JwtHelperService,
    private http: HttpClientService,
    private router: Router,
  
  ) {
    (_isAuthenticated = false);
    (_isRole=[])
  }
get isCurrentUser():GetCurrentUserType{
  return _GetCurrentUser;
}
  get isAuthenticated(): boolean {
    return _isAuthenticated;
  }
  get isRole(): RoleEnums[] {
    return _isRole;
  }
  /**
 *For  Check User Session
 */
identityCheck(): boolean {

  let token: string = null;
  let expired: boolean = true; // Default to expired
  
  if (typeof window !== 'undefined') {
    const sessionInfo = localStorage.getItem('SessionInfo');
    token = sessionInfo ? JSON.parse(sessionInfo)?.accessToken : null;
    
    if (token) {
      try {
        expired = this.jwtHelper.isTokenExpired(token);
        if (expired) {
          localStorage.removeItem('SessionInfo');
          token = null;
        } else {
          const tokenDecode: DecodedToken = this.jwtHelper.decodeToken(token);
          _GetCurrentUser = {
            email: tokenDecode.Email,
            firstName: tokenDecode.FirstName,
            id: tokenDecode.id,
            lastName: tokenDecode.LastName,
            phoneNumber: tokenDecode.PhoneNumber,
            roles: tokenDecode.Roles?.split(",") || [],
            userName: tokenDecode.UserName
          };

          if (tokenDecode.Roles?.includes(RoleEnums.SuperAdmin)) {
            _isRole = [RoleEnums.SuperAdmin];
          } else if (tokenDecode.Roles?.includes(RoleEnums.Admin)) {
            _isRole = [RoleEnums.Admin];
          } else {
            _isRole = [RoleEnums.User];
          }
        }
      } catch {
        expired = true;
        localStorage.removeItem('SessionInfo');
        token = null;
      }
    }
  }

  _isAuthenticated = token != null && !expired;
  
  // Clear user data if not authenticated
  if (!_isAuthenticated) {
    _GetCurrentUser = null;
    _isRole = [];
  }
  
  return _isAuthenticated;
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
export let _isRole: RoleEnums[];
export let _GetCurrentUser:GetCurrentUserType;
