import { ApplicationConfig, importProvidersFrom, provideZoneChangeDetection } from '@angular/core';
import { provideRouter, withViewTransitions } from '@angular/router';
import {TranslateModule, TranslateLoader} from "@ngx-translate/core";
import { routes } from './app.routes';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import {HttpClient} from '@angular/common/http';
import {provideNativeDateAdapter} from "@angular/material/core"
import {provideAnimations } from '@angular/platform-browser/animations';
import { provideToastr, ToastrModule } from 'ngx-toastr';
import { JwtModule } from '@auth0/angular-jwt';
import { httpClientInterceptor } from './services/common/http-client.interceptor';
import { provideServerRendering } from '@angular/platform-server';
import { provideServerRouting } from '@angular/ssr';
import { serverRoutes } from './app.routes.server';
import { NgxSpinnerModule } from "ngx-spinner";

const httpLoaderFactory: (http: HttpClient) => TranslateHttpLoader = (http: HttpClient) =>
  new TranslateHttpLoader(http, './i18n/', '.json');
export const appConfig: ApplicationConfig = {
  providers: [
   
    provideAnimations(),//for angular material animation
    provideNativeDateAdapter(),//for angular material animation
      provideZoneChangeDetection({ eventCoalescing: true }), 
    provideRouter(routes,withViewTransitions()),
    provideServerRouting(serverRoutes), 
    provideClientHydration(withEventReplay()),
    provideHttpClient(
      withFetch(), // Enable fetch for HttpClient
  withInterceptors([httpClientInterceptor])
    ),
      provideToastr(),
     
    importProvidersFrom([TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: httpLoaderFactory,
        deps: [HttpClient],
      },
    }),
      ToastrModule.forRoot({
      positionClass: 'toast-bottom-right',
      timeOut: 3000
    }),
    JwtModule.forRoot({
          config: {
        tokenGetter: () => localStorage.getItem("accessToken"),
        allowedDomains: ["localhost:4200"]
      }
    }),
   NgxSpinnerModule

  ])
  
  ]

};
