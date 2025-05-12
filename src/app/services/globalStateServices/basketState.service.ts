import { Injectable, signal, computed } from '@angular/core';
import ProductBasketType from '../../models/ui/ProductBasketType';

@Injectable({
  providedIn: 'root'
})
export class BasketService {
  // Create a signal with initial value
  private basketItems = signal<ProductBasketType[]>([]);

  // Computed value for total items in basket
  totalItems = computed(() => this.basketItems().reduce((total, item) => total + item.quantity, 0));

  // Computed value for total price of basket
  totalPrice = computed(() => this.basketItems().reduce((total, item) => total + item.totalPrice, 0));

  addProduct(product: ProductBasketType) {
    this.basketItems.update(items => {
      // Check if product with same id and size already exists
      const existingItemIndex = items.findIndex(
        item => item.id === product.id && item.size === product.size
      );
if (product.quantity==0) {
  return items.filter(x=>!(x.id==items[existingItemIndex].id&&x.size==items[existingItemIndex].size))
}
      if (existingItemIndex !== -1) {
        // If exists, update quantity and total price
        const updatedItems = [...items];
        updatedItems[existingItemIndex] = {
          ...updatedItems[existingItemIndex],
          quantity: updatedItems[existingItemIndex].quantity + product.quantity,
          totalPrice: product.totalPrice
        };
        return updatedItems;
      } else if (product.quantity!=0) {

        return [...items, product];
      }
      return items
    });
   
  }

  deleteProduct(id: string, size?: string) {
    this.basketItems.update(items => {
      if (size) {
        // Remove specific size variant of the product
        return items.filter(item => !(item.id === id && item.size === size));
      } else {
        // Remove all variants of the product
        return items.filter(item => item.id !== id);
      }
    });
  }

  updateProductQuantity(id: string, size: string, newQuantity: number) {
    this.basketItems.update(items => {
      return items.map(item => {
        if (item.id === id && item.size === size) {
          return {
            ...item,
            quantity: newQuantity,
            totalPrice: newQuantity * item.price
          };
        }
        return item;
      });
    });
  }


getProductBasket():ProductBasketType[]{
  return this.basketItems()
}
  clearBasket() {
    this.basketItems.set([]);
  }
}

