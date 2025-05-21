import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { environment } from '../../../environments/environment';

export const httpClientInterceptor: HttpInterceptorFn = (req, next) => {
  const translateService = inject(TranslateService);
  let currentLocale =  environment.defaultLanguage;
  let modifiedReq = req;

  let token: string | null = null;

  if (typeof window !== 'undefined' && window.localStorage) {
    currentLocale=localStorage.getItem("Locale")??currentLocale;
    const sessionInfo = localStorage.getItem('SessionInfo');
    token = sessionInfo ? JSON.parse(sessionInfo)?.accessToken : null;
  }
  if (token) {
    modifiedReq = modifiedReq.clone({
   url:req.url,
      setHeaders: {
        Authorization: `Bearer ${token}`,
        'Accept-Language': currentLocale,
      },
    });
  } else {
    modifiedReq = modifiedReq.clone({
      url:req.url,
      setHeaders: {
        'Accept-Language': currentLocale,
      },
    });
  }

  return next(modifiedReq);
};
