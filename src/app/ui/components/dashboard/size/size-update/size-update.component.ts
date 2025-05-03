import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-size-update',
  imports: [],
  templateUrl: './size-update.component.html',
  styleUrl: './size-update.component.css'
})
export class SizeUpdateComponent {

  constructor(private activatedRoute:ActivatedRoute) {}
  ngOnInit(): void {
      
    this.activatedRoute.params.subscribe({
      next: async params => {
        const sizeId: string = params["Id"];        
     console.log(sizeId)
    
      }
    });
  }
}
