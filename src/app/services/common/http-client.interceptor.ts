import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { environment } from '../../../environments/environment';
import { SpinnerLoadingService } from '../ui/spinner-loading.service';
import { finalize } from 'rxjs';

export const httpClientInterceptor: HttpInterceptorFn = (req, next) => {
  const translateService = inject(TranslateService);
  const spinner=inject(SpinnerLoadingService)
  let currentLocale =  environment.defaultLanguage;
  let modifiedReq = req;

  let token: string | null = null;

  if (typeof window !== 'undefined' && window.localStorage) {
     spinner.spinerShow();
    currentLocale=localStorage.getItem("Locale")??environment.defaultLanguage;
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

  return next(modifiedReq).pipe(finalize(()=>spinner.spinerHide()));
};
