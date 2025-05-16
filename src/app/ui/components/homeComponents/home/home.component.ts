import { Component, OnInit } from '@angular/core';
import { HomesliderComponent } from '../homeslider/homeslider.component';
import { DiscountSectionComponent } from '../discount-section/discount-section.component';
import { TopCategorySectionComponent } from "../top-category-section/top-category-section.component";
import { NewArriwalSectionComponent } from "../new-arriwal-section/new-arriwal-section.component";
import { HttpClientService } from '../../../../services/common/http-client.service';

@Component({
  selector: 'app-home',
  imports: [HomesliderComponent,
    DiscountSectionComponent,
    TopCategorySectionComponent, NewArriwalSectionComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {

  constructor(private httpClientService:HttpClientService) {    
  }
ngOnInit(){

  this.httpClientService.get({baseUrl:'https://dummyjson.com',controller:"products"})
  .subscribe(data=>console.log(data))



}
}
