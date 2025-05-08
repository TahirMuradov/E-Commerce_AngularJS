import { Component,Input } from '@angular/core';
import {CommonModule} from '@angular/common';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import ProductCartType from '../../../models/ui/ProductCartType';

@Component({
  selector: 'app-productcart',
  standalone:true,
  imports: [CommonModule,TranslateModule],
  templateUrl: './productcart.component.html',
  styleUrl: './productcart.component.css'
})
export class ProductcartComponent {
 
  constructor(private translate:TranslateService) {
  }
@Input({required:true})
product:ProductCartType
}
