import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TranslateServiceService {

  public langObsevable: BehaviorSubject<string>;

  constructor(private translteService: TranslateService) {
    const initialLang = translteService.currentLang || translteService.defaultLang;
    this.langObsevable = new BehaviorSubject<string>(initialLang);

    this.translteService.onLangChange.subscribe(lang => {
      this.langObsevable.next(lang.lang);
    });
  }

  public get SupportedLanguages(): string[] {
    return this.translteService.langs;
  }

  public get Currentlang(): string {
    return this.translteService.currentLang;
  }

  public get DefaultLang(): string {
    return this.translteService.defaultLang;
  }

  public changeCurrentLang(langKey: string) {
    if (this.SupportedLanguages.includes(langKey)) {
      this.translteService.use(langKey);
      this.langObsevable.next(langKey);
    }
  }
}
