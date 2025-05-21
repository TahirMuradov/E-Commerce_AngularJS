import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { environment } from '../environments/environment';
import { NgxSpinnerComponent } from 'ngx-spinner';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, TranslateModule, NgxSpinnerComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'E-Commerce';

  constructor(private translate: TranslateService) {
    this.translate.addLangs(environment.supportLanguagesLocale);
    this.translate.setDefaultLang(environment.defaultLanguage);
    this.translate.use(
      typeof window !== 'undefined' && window.localStorage
        ? localStorage?.getItem('Locale') ?? environment.defaultLanguage
        : environment.defaultLanguage
    );
  }
}
