import {HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

export const httpClientInterceptor: HttpInterceptorFn = (req, next) => {

const translateService=inject(TranslateService)
const currentLocale=translateService.currentLang;
const token=JSON.parse(localStorage.getItem('SessionInfo'))?.accessToken 
let modifiedReq = req;

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
