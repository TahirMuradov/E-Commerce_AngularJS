import { Component, Input } from '@angular/core';
import HomeSliderDataType, { homeSliderData } from '../../../../models/ui/HomeSliderDataType';
import { NgStyle } from '@angular/common';


@Component({
  selector: 'app-homeslider',
  imports: [NgStyle],
  standalone:true,
  templateUrl: './homeslider.component.html',
  styleUrl: './homeslider.component.css'
})
export class HomesliderComponent {

  @Input({required:false})
  datas:HomeSliderDataType
  currentIndex:number = 0;


  slides = homeSliderData;
  ngOnInit(){
    setInterval(()=>{
      this.currentIndex = (this.currentIndex + 1) % this.slides.length;
    },3000)
  }
  nextSlide() {
    this.currentIndex = (this.currentIndex + 1) % this.slides.length;
  }

  prevSlide() {
    this.currentIndex = (this.currentIndex - 1 + this.slides.length) % this.slides.length;
  }


}
