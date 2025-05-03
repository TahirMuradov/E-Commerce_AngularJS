import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-user-update',
  imports: [],
  templateUrl: './user-update.component.html',
  styleUrl: './user-update.component.css'
})
export class UserUpdateComponent {
  constructor(private activatedRoute: ActivatedRoute) {}
 
    ngOnInit(): void {
      
      this.activatedRoute.params.subscribe({
        next: async params => {
          const userId: string = params["Id"];
             console.log(userId)
      
        }
      });
    }

}
