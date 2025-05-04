import { CurrencyPipe, NgClass, NgIf } from '@angular/common';
import { Component, signal } from '@angular/core';


@Component({
  selector: 'app-header',
  imports: [NgClass,NgIf,CurrencyPipe],
  standalone:true,
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
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



}
