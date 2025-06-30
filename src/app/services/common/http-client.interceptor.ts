import { HttpInterceptorFn, HttpResponse, HttpStatusCode } from '@angular/common/http';
import { inject } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { environment } from '../../../environments/environment';
import { SpinnerLoadingService } from '../ui/spinner-loading.service';
import { catchError, finalize, tap, throwError } from 'rxjs';
import { CustomToastrService, ToastrMessageType, ToastrPosition } from '../ui/custom-toastr.service';
import { SsrCookieServiceService } from './ssr-cookie-service.service';

function getCookie(name: string): string | null {
  const match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
  return match ? decodeURIComponent(match[2]) : null;
}

function setCookie(name: string, value: string, days = 365) {
  const expires = new Date(Date.now() + days * 864e5).toUTCString();
  document.cookie = `${name}=${encodeURIComponent(value)}; expires=${expires}; path=/`;
}

export const httpClientInterceptor: HttpInterceptorFn = (req, next) => {


  const translateService = inject(TranslateService);
  const spinner = inject(SpinnerLoadingService);
  const toastrService = inject(CustomToastrService);
  const ssrCookieService = inject(SsrCookieServiceService);

  const serverLocale = ssrCookieService.get('Locale') || environment.defaultLanguage;

  let clientLocale: string | null = null;
  if (typeof window !== 'undefined') {
    clientLocale = getCookie('Locale');

  }

if (clientLocale !== serverLocale && translateService.currentLang !== serverLocale) {
  translateService.use(serverLocale);
  if (typeof window !== 'undefined') {
    setCookie('Locale', serverLocale);
    clientLocale = serverLocale; 

    translateService.setDefaultLang(environment.defaultLanguage);
  }
}



  let token: string | null = null;
  if (typeof window !== 'undefined' && window.localStorage) {
      spinner.spinerShow(); 
    const sessionInfo = localStorage.getItem('SessionInfo');
    token = sessionInfo ? JSON.parse(sessionInfo)?.accessToken : null;
  }

  const headers: Record<string, string> = {
    'Accept-Language': clientLocale ?? serverLocale,
  };
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const modifiedReq = req.clone({ setHeaders: headers });

  return next(modifiedReq).pipe(
    catchError(res => {
      const isBrowser = typeof window !== 'undefined';
      let errorMessage = '';

      if (res) {
        switch (res.status) {
          case 0:
            if (isBrowser) {
              toastrService.message(
                translateService.instant('clientErrorMessage.failedFetchServer'),
                translateService.instant('clientErrorMessage.serverError'),
                { messageType: ToastrMessageType.Warning, position: ToastrPosition.BottomFullWidth }
              );
            }
            break;

          case HttpStatusCode.BadRequest:
          case HttpStatusCode.NotFound:
            if (Array.isArray(res.error?.messages)) {
              errorMessage = res.error.messages.join('\n');
            } else if (typeof res.error?.message === 'string') {
              errorMessage = res.error.message;
            } else {
              errorMessage = JSON.stringify(res.error);
            }
            toastrService.message(
              errorMessage,
              translateService.instant(
                res.status === HttpStatusCode.BadRequest ? 'MessageType.warning' : 'MessageType.info'
              ),
              { messageType: ToastrMessageType.Warning, position: ToastrPosition.BottomFullWidth }
            );
            break;

          case HttpStatusCode.Unauthorized:
          case HttpStatusCode.Forbidden:
            toastrService.message(
              translateService.instant('clientErrorMessage.accessDenied'),
              translateService.instant('MessageType.info'),
              { messageType: ToastrMessageType.Info, position: ToastrPosition.BottomFullWidth }
            );
            break;

          default:
            if (Array.isArray(res.error?.messages)) {
              errorMessage = res.error.messages.join('\n');
            } else if (typeof res.error?.message === 'string') {
              errorMessage = res.error.message;
            } else {
              errorMessage = JSON.stringify(res.error);
            }
            toastrService.message(
              errorMessage || translateService.instant('clientErrorMessage.defaultErorContent'),
              translateService.instant('MessageType.error'),
              { messageType: ToastrMessageType.Error, position: ToastrPosition.BottomFullWidth }
            );
            break;
        }
      }

      return throwError(() => res);
    }),

    tap((res: any) => {
      const isBrowser = typeof window !== 'undefined';
      if (res instanceof HttpResponse) {
        if (['POST', 'PUT', 'DELETE'].includes(req.method)) {
          const messages: string[] = [];
          if (typeof res.body?.message === 'string') {
            messages.push(res.body.message);
          }
          if (Array.isArray(res.body?.messages)) {
            messages.push(...res.body.messages);
          }
          if (isBrowser && messages.length) {
            toastrService.message(messages.join('\n'), translateService.instant('MessageType.success'), {
              messageType: ToastrMessageType.Success,
              position: ToastrPosition.BottomFullWidth,
            });
          }
        }
      }
      return res;
    }),

    finalize(() => {
      if (typeof window !== 'undefined') {
        spinner.spinerHide();
      }
    })
  );
};
