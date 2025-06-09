import {HttpInterceptorFn, HttpResponse, HttpStatusCode } from '@angular/common/http';
import { inject } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { environment } from '../../../environments/environment';
import { SpinnerLoadingService } from '../ui/spinner-loading.service';
import { catchError, finalize,  tap, throwError } from 'rxjs';
import { CustomToastrService, ToastrMessageType, ToastrPosition } from '../ui/custom-toastr.service';
export const httpClientInterceptor: HttpInterceptorFn = (req, next) => {
  const translateService = inject(TranslateService);
  const spinner=inject(SpinnerLoadingService)
  const toastrService=inject(CustomToastrService)
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

  return next(modifiedReq).pipe(
    finalize(()=>spinner.spinerHide())
  ,catchError(res=>{
              let errorMessage = '';
     switch (res.status) {
        case 0:
      
          toastrService.message(translateService.instant("clientErrorMessage.failedFetchServer"), translateService.instant("clientErrorMessage.serverError"), {
            messageType: ToastrMessageType.Warning,
            position: ToastrPosition.BottomFullWidth
          });
          break;
        case HttpStatusCode.BadRequest:


          if (Array.isArray(res.error?.messages)) {
            errorMessage = res.error?.messages.join('\n');
          } else if (typeof res.error?.message === 'string') {
            errorMessage =res.error?.message;
          } else {
            errorMessage = JSON.stringify(res.error);
          }
          toastrService.message(errorMessage, translateService.instant("MessageType.warning"), {
            messageType: ToastrMessageType.Warning,
            position: ToastrPosition.BottomFullWidth
          });
          break;
        case HttpStatusCode.NotFound:
           

          if (Array.isArray(res.error?.messages)) {
            errorMessage = res.error?.messages.join('\n');
          } else if (typeof res.error?.message === 'string') {
            errorMessage = res.error?.message;
          } else {
            errorMessage = JSON.stringify(res.error);
          }
          toastrService.message(errorMessage, translateService.instant("MessageType.info"), {
            messageType: ToastrMessageType.Warning,
            position: ToastrPosition.BottomFullWidth
          });
          break;
       case HttpStatusCode.Unauthorized||HttpStatusCode.Forbidden:
          if (Array.isArray(res.error?.messages)) {
            errorMessage = res.error?.messages.join('\n');
          } else if (typeof res.error?.message === 'string') {
            errorMessage = res.error?.message;
          } else {
            errorMessage = JSON.stringify(res.error);
          }
          toastrService.message(errorMessage, translateService.instant("MessageType.info"), {
            messageType: ToastrMessageType.Info,
            position: ToastrPosition.BottomFullWidth
          });
        break;
       
       default:
                if (Array.isArray(res.error?.messages)) {
    errorMessage = res.error?.messages.join('\n');
  } else if (typeof res.error?.message === 'string') {
    errorMessage = res.error?.message;
  } else {
    errorMessage = JSON.stringify(res.error);
  }

  // Use default message if errorMessage is empty
  const displayMessage = errorMessage!=='' 
    ? errorMessage 
    : translateService.instant("clientErrorMessage.defaultErorContent");

  toastrService.message(
    displayMessage,
    translateService.instant("MessageType.error"),
    {
      messageType: ToastrMessageType.Error,
      position: ToastrPosition.BottomFullWidth
    }
  );
  
          break;
      }
 return throwError(() => res);
      
  }),
  tap((res: any) => {

    const responseBody = res.body;
    let messages:string[]=[]
      if (res instanceof HttpResponse) {
     
        if (req.method === 'POST' || req.method === 'PUT' || req.method === 'DELETE') {
      if (typeof responseBody?.message === 'string') {
        messages.push(responseBody.message);
      }
     if (Array.isArray(responseBody?.messages)) {
        messages.push(...responseBody.messages);
      }
          toastrService.message(
          messages.join("\n")??"",
            translateService.instant("MessageType.success"),
            {
              messageType: ToastrMessageType.Success,
              position: ToastrPosition.BottomFullWidth
            }
          );
        }
      }
      return res;
    }),
    // map((event: HttpEvent<any>) => {

    //                 if (event instanceof HttpResponse) {
    //                   if (event.ok) {
    //                      console.log('Success');
    //                   } else {
    //                     console.log('Error');
    //                   }
    //                 }
            
    //                 return event;
    //               })
);
};
