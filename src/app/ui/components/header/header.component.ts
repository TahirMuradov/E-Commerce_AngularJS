import { CurrencyPipe, NgClass, NgFor } from '@angular/common';
import { Component, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import {TranslateModule, TranslateService} from "@ngx-translate/core";
import { BasketService } from '../../../services/globalStateServices/basketState.service';

@Component({
  selector: 'app-header',
  imports: [NgClass,NgFor,CurrencyPipe,TranslateModule,RouterLink],
  standalone:true,
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {

constructor(private translate: TranslateService,public basketService:BasketService) { 
}

currentLocale:string
supportLangs:string[]
ngOnInit() {
  this.currentLocale= this.translate.currentLang;
this.supportLangs=this.translate.getLangs()

}

  clickSignal=signal({
    cartListToogle:false,
    toggleMenu:false
  })

  onclick(cartListToogle:boolean,
    toggleMenu:boolean,
  
  ){
    this.clickSignal.set({
 cartListToogle:cartListToogle,
 toggleMenu:toggleMenu
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
