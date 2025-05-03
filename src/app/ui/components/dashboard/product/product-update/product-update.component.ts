import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-product-update',
  imports: [],
  templateUrl: './product-update.component.html',
  styleUrl: './product-update.component.css'
})
export class ProductUpdateComponent {
  constructor(private activatedRoute:ActivatedRoute) {  
  }
  ngOnInit(): void {
      
    this.activatedRoute.params.subscribe({
      next: async params => {
        const productId: string = params["Id"];   
     console.log(productId)
    
      }
    });
  }

}
