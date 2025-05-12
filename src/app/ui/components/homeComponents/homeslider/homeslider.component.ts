import {  Component, Input } from '@angular/core';
import HomeSliderDataType, { homeSliderData } from '../../../../models/ui/HomeSliderDataType';
import { CommonModule, NgStyle } from '@angular/common';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { CarouselModule } from 'ngx-owl-carousel-o';
import {TranslateModule, TranslateService} from "@ngx-translate/core";
declare var $: any;
@Component({
  selector: 'app-homeslider',
  standalone:true,
  imports: [NgStyle,CarouselModule,CommonModule,TranslateModule],
  templateUrl: './homeslider.component.html',
  styleUrl: './homeslider.component.css'
})
export class HomesliderComponent  {
  constructor(private translate: TranslateService) { 
  }
  @Input({required:false})
  datas:HomeSliderDataType
  currentIndex:number = 0;
  // ngAfterViewInit(): void {
  //   const owlElement = $('.owl-carousel');
  //   owlElement.on('mousewheel', '.owl-stage', function (e: any) {
  //     if (e.originalEvent.deltaY > 0) {
  //       owlElement.trigger('next.owl.carousel');
  //     } else {
  //       owlElement.trigger('prev.owl.carousel');
  //     }
  //     e.preventDefault();
  //   });
  // }
  customOptions: OwlOptions = {

    loop: true,

    mouseDrag: true,

    touchDrag: false,

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
  
  
  slides = homeSliderData;
  ngOnInit(){

  }



}
