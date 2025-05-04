import { NgClass } from '@angular/common';
import { Component, signal } from '@angular/core';


@Component({
  selector: 'app-header',
  imports: [NgClass],
  standalone: true,
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  clickData =signal({
    userDropdownOpen:false,
    categoryDropdown:false,
    sizeDropdown:false,
    productDropDown:false,
    barsClick:false
      }) 
onclick(userDropdownOpen:boolean,
  categoryDropdown:boolean,
  sizeDropdown:boolean,
  productDropDown:boolean,
  barsClick:boolean){
  this.clickData.set({
    barsClick:barsClick,
    categoryDropdown:categoryDropdown,
    productDropDown:productDropDown,
    sizeDropdown:sizeDropdown,
    userDropdownOpen:userDropdownOpen
  })
}


}
