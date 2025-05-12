import { Component, signal } from '@angular/core';
import { BasketService } from '../../../services/globalStateServices/basketState.service';
import { RouterLink } from '@angular/router';
import {CommonModule} from "@angular/common"
import ProductBasketType from '../../../models/ui/ProductBasketType';
@Component({
  selector: 'app-cart-detail',
  imports: [RouterLink,CommonModule],
  standalone:true,
  templateUrl: './cart-detail.component.html',
  styleUrl: './cart-detail.component.css'
})
export class CartDetailComponent {

  signalBasketItems = signal<ProductBasketType[]>([])
  constructor(public basketService:BasketService) {    
 this.signalBasketItems.update(x=>this.basketService.getProductBasket())
  }
getSubtotal(): number {
  return this.signalBasketItems().reduce((sum, item) => sum + item.totalPrice, 0);
}

getTotal(): number {
  return this.getSubtotal() + 8;
}

clearCart() {
  this.basketService.clearBasket();
}

}
