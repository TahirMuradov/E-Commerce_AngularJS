import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import localeRu from '@angular/common/locales/ru';
import localeAz from '@angular/common/locales/az';
import { registerLocaleData } from '@angular/common';

registerLocaleData(localeRu, 'ru');
registerLocaleData(localeAz, 'az');
bootstrapApplication(AppComponent, appConfig)
  .catch((err) => console.error(err));
