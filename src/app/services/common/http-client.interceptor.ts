import {HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

export const httpClientInterceptor: HttpInterceptorFn = (req, next) => {

const translateService=inject(TranslateService)
const currentLocale=translateService.currentLang;
let modifiedReq = req;

  let token: string | null = null;

  if (typeof window !== 'undefined' && window.localStorage) {
    const sessionInfo = localStorage.getItem('SessionInfo');
    token = sessionInfo ? JSON.parse(sessionInfo)?.accessToken : null;
  }
    if (token) {
      modifiedReq = modifiedReq.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`
        }
      });
    }
  modifiedReq = modifiedReq.clone({
      setHeaders: {
        'Accept-Language': currentLocale
      }
    });


  return next(req);
};
