import { Component } from '@angular/core';
import { ProductcartComponent } from '../../productcart/productcart.component';
import {CommonModule} from '@angular/common';
@Component({
  selector: 'app-new-arriwal-section',
  standalone:true,
  imports: [ProductcartComponent,CommonModule],
  templateUrl: './new-arriwal-section.component.html',
  styleUrl: './new-arriwal-section.component.css'
})
export class NewArriwalSectionComponent {
 data:{
  id:string,
  imgUrl:string,
  category:string,
  price:number,
  title:string
}[]=[
  {
    id: 'prod-001',
    imgUrl: 'https://example.com/images/jeans-midi-dress.jpg',
    category: 'Cocktail Dresses',
    price: 39.90,
    title: 'Blue Denim Midi Cocktail Dress'
  },
  {
    id: 'prod-002',
    imgUrl: 'https://example.com/images/mens-sneakers.jpg',
    category: 'Footwear',
    price: 59.99,
    title: 'Classic White Leather Sneakers'
  },
  {
    id: 'prod-003',
    imgUrl: 'https://example.com/images/winter-jacket.jpg',
    category: 'Outerwear',
    price: 129.95,
    title: 'Waterproof Winter Parka Jacket'
  },
  {
    id: 'prod-004',
    imgUrl: 'https://example.com/images/smart-watch.jpg',
    category: 'Accessories',
    price: 199.00,
    title: 'Pro Fitness Smart Watch'
  },
  {
    id: 'prod-005',
    imgUrl: 'https://example.com/images/linen-shirt.jpg',
    category: 'Tops',
    price: 34.50,
    title: 'Premium Linen Button-Up Shirt'
  },
  {
    id: 'prod-006',
    imgUrl: 'https://example.com/images/wool-blanket.jpg',
    category: 'Home',
    price: 79.99,
    title: 'Luxury Wool Throw Blanket'
  },
  {
    id: 'prod-007',
    imgUrl: 'https://example.com/images/backpack.jpg',
    category: 'Bags',
    price: 89.95,
    title: 'Urban Commuter Backpack'
  },
  {
    id: 'prod-008',
    imgUrl: 'https://example.com/images/yoga-pants.jpg',
    category: 'Activewear',
    price: 45.00,
    title: 'High-Waist Yoga Leggings'
  },
  {
    id: 'prod-009',
    imgUrl: 'https://example.com/images/ceramic-mug.jpg',
    category: 'Kitchen',
    price: 18.75,
    title: 'Artisan Ceramic Coffee Mug'
  },
  {
    id: 'prod-010',
    imgUrl: 'https://example.com/images/leather-wallet.jpg',
    category: 'Accessories',
    price: 49.99,
    title: 'Minimalist Leather Wallet'
  }
];

}
