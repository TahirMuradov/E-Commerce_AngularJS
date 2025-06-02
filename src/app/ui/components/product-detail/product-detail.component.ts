import { Component, OnInit, signal } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { CommonModule } from '@angular/common';
import ProductDetailType, { Data } from '../../../models/ui/ProductDetailType';
import { RouterLink } from '@angular/router';
import { BasketService } from '../../../services/globalStateServices/basketState.service';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'app-product-detail',
  imports: [CommonModule,CarouselModule,RouterLink],
  standalone:true,
  templateUrl: './product-detail.component.html',
  styleUrl: './product-detail.component.css'
})
export class ProductDetailComponent implements OnInit {

  constructor (public basketService:BasketService,private meta: Meta, private title: Title){}
  customOptions: OwlOptions = {
  
    loop: true,
  
    mouseDrag: true,
  
    touchDrag: true,
  
    pullDrag: false,
  
    dots: false,
  
    navSpeed: 700,
  
    navText: ['', ''],
  
    responsive: {
  
      0: {
  
        items: 1
  
      },
  
      400: {
  
        items: 1
  
      },
  
      740: {
  
        items: 1
  
      },
  
      940: {
  
        items: 1
  
      }
  
    },
  
    nav: true
  
  }



  signalProduct=signal<ProductDetailType|null>(null)
//key is size number ,value is size count

signalSelectedSize=signal<string|null>(null)
signalSelectedCount=signal<number>(0)
  ngOnInit(): void {
   this.signalProduct.set(Data[0])
  this.title.setTitle(this.signalProduct().title + ' | My Shop');
        this.meta.updateTag({ name: 'description', content: this.signalProduct().description });
  this.meta.updateTag({ property: 'og:title', content: this.signalProduct().title });
this.meta.updateTag({ property: 'og:description', content: this.signalProduct().description });
this.meta.updateTag({ property: 'og:image', content: this.signalProduct().imgUrls[0] });
  
      }
  onAddBasketItem(){
    debugger;
    if (this.signalSelectedSize()!=null||this.signalSelectedCount()>0) {
     this.basketService.addProduct({
      id:this.signalProduct().id,
      imgUrl:this.signalProduct().imgUrls[0],
      price:this.signalProduct().price,
      quantity:this.signalSelectedCount(),
      size:this.signalSelectedSize(),
      title:this.signalProduct().title,
      totalPrice:this.signalProduct().price*this.signalSelectedCount()
     })
 
    }else{
      alert("please select size or count")
    }

  }
onSelectSize(size:string){
this.signalSelectedSize.update(value=>value=size)
this.signalSelectedCount.update(value=>value=0);
}

increment() {
  this.signalSelectedCount.update(value => value + 1); 
}

decrement() {
  this.signalSelectedCount.update(value => value <= 0 ? 0 : value - 1);
}
}
