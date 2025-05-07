import { Component } from '@angular/core';
import {CommonModule} from '@angular/common';

@Component({
  selector: 'app-discount-section',
  imports: [CommonModule],
  standalone:true,
  templateUrl: './discount-section.component.html',
  styleUrl: './discount-section.component.css'
})
export class DiscountSectionComponent {

  data = [
    {
      title: 'Summer Sale',
      description: 'Get 30% off on all items'
    },
    {
      title: 'New Customer Discount',
      description: 'First purchase 20% off'
    },
    {
      title: 'Bundle Deal',
      description: 'Buy 2 get 1 free'
    }
  ];

}
