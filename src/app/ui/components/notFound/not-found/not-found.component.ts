import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslateService ,TranslateModule} from '@ngx-translate/core';

@Component({
  selector: 'app-not-found',
  imports: [TranslateModule,RouterLink],
  templateUrl: './not-found.component.html',
  styleUrl: './not-found.component.css'
})
export class NotFoundComponent {

constructor(private translate:TranslateService) {
    
}
}
