import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import localeRu from '@angular/common/locales/ru';
import localeAz from '@angular/common/locales/az';
import localeEn from '@angular/common/locales/en';
import { registerLocaleData } from '@angular/common';

registerLocaleData(localeAz, 'az');
registerLocaleData(localeEn, 'en');
registerLocaleData(localeRu, 'ru');
bootstrapApplication(AppComponent, appConfig)
  .catch((err) => console.error(err));
