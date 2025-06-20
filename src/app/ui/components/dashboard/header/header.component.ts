import { NgClass } from '@angular/common';
import { Component, signal } from '@angular/core';
import { AuthService } from '../../../../services/common/auth.service';
import { RouterLink } from '@angular/router';
import { HeaderDirective } from '../../../../directive/header.directive';

@Component({
  selector: 'app-header',
  imports: [NgClass, RouterLink,  HeaderDirective],
  standalone: true,
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent {
  constructor(public atuhService: AuthService) {
    this.atuhService.identityCheck();
  }

 clickVisible = signal({
  barsVisible:false,
  userDropDown:false
 });
  onclick(

    barsClick: boolean,
    userDropDown:boolean
  ) {
    this.clickVisible.set({
barsVisible:barsClick,
userDropDown:userDropDown
    }  
    );
  }
}
