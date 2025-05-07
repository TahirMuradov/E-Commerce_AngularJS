import { Component } from '@angular/core';
import {TranslateModule, TranslateService} from "@ngx-translate/core";
import {DatePipe} from '@angular/common';
@Component({
  selector: 'app-footer',
  standalone:true,
  imports: [TranslateModule,DatePipe],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css'
})
export class FooterComponent {

  constructor(private translate: TranslateService) {
   this.currentYear =new Date().getTime();
  }
readonly currentYear:number;
}
