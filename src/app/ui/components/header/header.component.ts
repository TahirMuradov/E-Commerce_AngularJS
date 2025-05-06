import { CurrencyPipe, NgClass, NgIf } from '@angular/common';
import { Component, signal } from '@angular/core';
import {TranslateModule, TranslateService} from "@ngx-translate/core";

@Component({
  selector: 'app-header',
  imports: [NgClass,NgIf,CurrencyPipe,TranslateModule],
  standalone:true,
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {

constructor(private translate: TranslateService) { 
}

  clickSignal=signal({
    cartListToogle:false,
    toggleMenu:false,
    menuVisible:false
  })

  onclick(cartListToogle:boolean,
    toggleMenu:boolean,
    menuVisible:boolean,
  ){
    this.clickSignal.set({
 cartListToogle:cartListToogle,
 menuVisible:menuVisible,
 toggleMenu:menuVisible
    })

if (cartListToogle) {
  document.body.classList.add('cart-data-open');
} else {
  document.body.classList.remove('cart-data-open');
}


  }


  currentLanguage = 'az'; // Default language
  currencyCode = 'AZN'; // Can be made dynamic based on language
  
  useLanguage(event: Event): void {
    const lang = (event.target as HTMLSelectElement).value;
    this.currentLanguage = lang;
    this.translate.use(lang);
    // Optional: Update currency code based on language
    this.updateCurrencyCode(lang);
  }
  
  private updateCurrencyCode(lang: string): void {
    const currencyMap: {[key: string]: string} = {
      'en': 'USD',
      'ru': 'RUB',
      'az': 'AZN'
    };
    this.currencyCode = currencyMap[lang] || 'AZN';
  }
}
