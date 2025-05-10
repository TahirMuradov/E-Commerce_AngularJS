import { Component } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { CarouselModule } from 'ngx-owl-carousel-o';
@Component({
  selector: 'app-product-detail',
  imports: [CarouselModule],
  standalone:true,
  templateUrl: './product-detail.component.html',
  styleUrl: './product-detail.component.css'
})
export class ProductDetailComponent {
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
  
}
