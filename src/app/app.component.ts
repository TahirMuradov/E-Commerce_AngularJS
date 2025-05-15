import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {TranslateModule, TranslateService} from "@ngx-translate/core";
import { environment } from '../environments/environment';
@Component({
  selector: 'app-root',
  standalone: true,                                    
  imports: [RouterOutlet,TranslateModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'E-Commerce';
  constructor(private translate: TranslateService) {
    this.translate.addLangs(environment.supportLanguagesLocale);
    this.translate.setDefaultLang(environment.defaultLanguage);
    this.translate.use(environment.defaultLanguage);
  }
currentLangCode:string;

  useLanguage(language: string): void {
    // Save to local storage or some related activity.
    this.translate.use(language);

    this.currentLangCode = this.translate.currentLang;
    console.log('Current Language:', this.currentLangCode);
  }
}
