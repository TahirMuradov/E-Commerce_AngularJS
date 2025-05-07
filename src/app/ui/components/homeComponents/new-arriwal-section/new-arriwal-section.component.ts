import { Component, DoCheck, OnInit, signal } from '@angular/core';
import { ProductcartComponent } from '../../productcart/productcart.component';
import {CommonModule} from '@angular/common';
import ProductCartType from '../../../../models/ui/ProductCartType';
import CategoryType from '../../../../models/ui/CategoryType';
import {TranslateModule, TranslateService} from "@ngx-translate/core";
@Component({
  selector: 'app-new-arriwal-section',
  standalone:true,
  imports: [ProductcartComponent,CommonModule,TranslateModule],
  templateUrl: './new-arriwal-section.component.html',
  styleUrl: './new-arriwal-section.component.css'
})
export class NewArriwalSectionComponent implements OnInit  {

constructor(private translate: TranslateService) { 
}

  signalSelectCategory = signal<string>('ALL');
  signalData = signal<ProductCartType[]>([]);
  signalCategories = signal<CategoryType[]>([]);
  originalData: ProductCartType[] = [];
 data:ProductCartType[]=[
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
 categories: CategoryType[] = [
  {id:'cat-000',
    categoryName:"ALL"
  },
  {
    id: 'cat-001',
    categoryName: 'Accessories'
  },
  {
    id: 'cat-002',
    categoryName: 'Activewear'
  },
  {
    id: 'cat-003',
    categoryName: 'Bags'
  },
  {
    id: 'cat-004',
    categoryName: 'Cocktail Dresses'
  },
  {
    id: 'cat-005',
    categoryName: 'Footwear'
  },
  {
    id: 'cat-006',
    categoryName: 'Home'
  },
  {
    id: 'cat-007',
    categoryName: 'Kitchen'
  },
  {
    id: 'cat-008',
    categoryName: 'Outerwear'
  },
  {
    id: 'cat-009',
    categoryName: 'Tops'
  }
];


ngOnInit(): void {
  this.signalData.set(this.data);
  this.originalData = [...this.data]; 
  this.signalCategories.set(this.categories);
}



categorySelect(categoryName: string) {
  console.log(categoryName)
  this.signalSelectCategory.set(categoryName);
  
  if (categoryName.toUpperCase() === 'ALL') {
    
    this.signalData.set([...this.originalData]);
  } else {
   
    this.signalData.update(current => 
      this.originalData.filter(product => 
        product.category.toLowerCase().includes(categoryName.toLowerCase())
      )
    );
  }

}

}
