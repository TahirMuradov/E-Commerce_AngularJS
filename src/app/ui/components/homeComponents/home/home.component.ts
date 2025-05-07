import { Component } from '@angular/core';
import { HomesliderComponent } from '../homeslider/homeslider.component';
import { DiscountSectionComponent } from '../discount-section/discount-section.component';

@Component({
  selector: 'app-home',
  imports: [HomesliderComponent, DiscountSectionComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

}
