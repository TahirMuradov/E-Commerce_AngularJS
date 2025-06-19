import {afterRender, Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { environment } from '../environments/environment';
import { NgxSpinnerComponent } from 'ngx-spinner';
import { CookieManagerService } from './services/common/cookie-manager.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, TranslateModule, NgxSpinnerComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent  {
  title = 'E-Commerce';

  constructor(private translate: TranslateService,private clientCookieService:CookieManagerService) {
    this.translate.addLangs(environment.supportLanguagesLocale);
    this.translate.setDefaultLang(clientCookieService.getCookie("Locale")?? environment.defaultLanguage);

 
  }

}
