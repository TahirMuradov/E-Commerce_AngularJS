import { NgClass } from '@angular/common';
import { Component, signal } from '@angular/core';
import { AuthService } from '../../../../services/common/auth.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-header',
  imports: [NgClass, RouterLink],
  standalone: true,
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent {
  constructor(public atuhService: AuthService) {
    this.atuhService.identityCheck();
  }

  clickData = signal({
    userDropdownOpen: false,
    categoryDropdown: false,
    sizeDropdown: false,
    productDropDown: false,
    barsClick: false,
    disCountArea:false,
    homesliderItem:false
  });
  onclick(
    userDropdownOpen: boolean,
    categoryDropdown: boolean,
    sizeDropdown: boolean,
    productDropDown: boolean,
    barsClick: boolean,
    disCountArea:boolean,
    homesliderItem:boolean
  ) {
    this.clickData.set({
      barsClick: barsClick,
      categoryDropdown: categoryDropdown,
      productDropDown: productDropDown,
      sizeDropdown: sizeDropdown,
      userDropdownOpen: userDropdownOpen,
      disCountArea:disCountArea,
      homesliderItem:homesliderItem
    });
  }
}
