import { Component } from '@angular/core';
import { HomesliderComponent } from '../homeslider/homeslider.component';
import { DiscountSectionComponent } from '../discount-section/discount-section.component';
import { TopCategorySectionComponent } from "../top-category-section/top-category-section.component";
import { NewArriwalSectionComponent } from "../new-arriwal-section/new-arriwal-section.component";

@Component({
  selector: 'app-home',
  imports: [HomesliderComponent,
    DiscountSectionComponent,
    TopCategorySectionComponent, NewArriwalSectionComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

}
