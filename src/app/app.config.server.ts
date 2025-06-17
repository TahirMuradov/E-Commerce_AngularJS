import { mergeApplicationConfig, ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideServerRendering } from '@angular/platform-server';
import { provideServerRouting } from '@angular/ssr';
import { appConfig } from './app.config';
import { serverRoutes } from './app.routes.server';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import {HttpClient, provideHttpClient} from '@angular/common/http';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
const httpLoaderFactory: (http: HttpClient) => TranslateHttpLoader = (http: HttpClient) =>
  new TranslateHttpLoader(http, './i18n/', '.json');
process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = '0';
const serverConfig: ApplicationConfig = {
  providers: [
    provideServerRendering(),
    provideServerRouting(serverRoutes),
    provideHttpClient(),
    importProvidersFrom([TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: httpLoaderFactory,
        deps: [HttpClient],
      },
    })])
  ]
};

export const config = mergeApplicationConfig(appConfig, serverConfig);
