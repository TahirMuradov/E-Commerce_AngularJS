import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { config } from './app/app.config.server';
import { registerLocaleData } from '@angular/common';
import localeRu from '@angular/common/locales/ru';
import localeAz from '@angular/common/locales/az';
import localeEn from '@angular/common/locales/en';
registerLocaleData(localeAz, 'az');
registerLocaleData(localeEn, 'en');
registerLocaleData(localeRu, 'ru');
const bootstrap = () => bootstrapApplication(AppComponent, config);

export default bootstrap;
