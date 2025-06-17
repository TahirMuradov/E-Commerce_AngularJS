import { CommonModule, CurrencyPipe, NgClass, NgFor } from '@angular/common';
import { Component, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { BasketService } from '../../../services/globalStateServices/basketState.service';
import { AuthService } from '../../../services/common/auth.service';
import { environment } from '../../../../environments/environment';
import { RoleEnums } from '../../../models/enums/RoleEnums';

@Component({
  selector: 'app-header',
  imports: [ CurrencyPipe, TranslateModule, RouterLink,CommonModule],
  standalone: true,
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent {
  constructor(
    private translate: TranslateService,
    public basketService: BasketService,
    public authService: AuthService,
    
  ) {}
  readonly RoleEnum = RoleEnums;

  currentLocale: string;
  supportLangs: string[];
  ngOnInit() {
    this.currentLocale = this.translate.currentLang;
    this.supportLangs = this.translate.getLangs();
    this.authService.identityCheck();
  }

  clickSignal = signal({
    cartListToogle: false,
    toggleMenu: false,
  });
  logout() {
    this.authService.signOut();
  }
  onclick(cartListToogle: boolean, toggleMenu: boolean) {
    this.clickSignal.set({
      cartListToogle: cartListToogle,
      toggleMenu: toggleMenu,
    });

    if (cartListToogle) {
      document.body.classList.add('cart-data-open');
    } else {
      document.body.classList.remove('cart-data-open');
    }
  }

 

  useLanguage(event: Event): void {
    const lang = (event.target as HTMLSelectElement).value;
    if (lang && environment.supportLanguagesLocale.includes(lang)) {
      this.currentLocale = lang;
      this.translate.use(lang);

    }
  }


}
