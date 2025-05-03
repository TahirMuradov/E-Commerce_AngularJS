import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-category-update',
  imports: [],
  templateUrl: './category-update.component.html',
  styleUrl: './category-update.component.css'
})
export class CategoryUpdateComponent {
 
  constructor(private activatedRoute:ActivatedRoute) {  
  }
  ngOnInit(): void {
      
    this.activatedRoute.params.subscribe({
      next: async params => {
        const categoryId: string = params["Id"];   
     console.log(categoryId)
    
      }
    });
  }

}
