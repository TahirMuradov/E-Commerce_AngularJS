import { Component } from '@angular/core';
import {CommonModule} from '@angular/common';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
@Component({
  selector: 'app-top-category-section',
  imports: [CommonModule,TranslateModule],
  templateUrl: './top-category-section.component.html',
  styleUrl: './top-category-section.component.css'
})
export class TopCategorySectionComponent {
 
 
  constructor( private translate: TranslateService) {

    
  }
  data:  {
    pictureUrl: string;
    title: string;
    description: string;
    categoryName: string;
  }[]= [
    {
      pictureUrl: 'img/bg-img/bg-3.jpg',
      title: 'Men\'s Fashion',
      description: 'Trendy Styles for Him',
      categoryName: 'men'
    },
    {
      pictureUrl: 'img/bg-img/bg-2.jpg',
      title: 'Women\'s Collection',
      description: 'Elegant Outfits for Her',
      categoryName: 'women'
    }
  ] 
}
