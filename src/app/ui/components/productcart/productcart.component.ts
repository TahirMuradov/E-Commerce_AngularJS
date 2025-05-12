import { Component,Input } from '@angular/core';
import {CommonModule} from '@angular/common';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import ProductCartType from '../../../models/ui/ProductCartType';
import { RouterLink } from '@angular/router';
import { BasketService } from '../../../services/globalStateServices/basketState.service';

@Component({
  selector: 'app-productcart',
  standalone:true,
  imports: [CommonModule,TranslateModule,RouterLink],
  templateUrl: './productcart.component.html',
  styleUrl: './productcart.component.css'
})
export class ProductcartComponent {
 
  constructor(private translate:TranslateService,public basketService:BasketService) {
  }
@Input({required:true})
product:ProductCartType

}
