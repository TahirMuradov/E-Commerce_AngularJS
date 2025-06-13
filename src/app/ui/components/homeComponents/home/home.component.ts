import { Component, OnInit, signal } from '@angular/core';
import { HomesliderComponent } from '../homeslider/homeslider.component';
import { DiscountSectionComponent } from '../discount-section/discount-section.component';
import { TopCategorySectionComponent } from '../top-category-section/top-category-section.component';
import { NewArriwalSectionComponent } from '../new-arriwal-section/new-arriwal-section.component';
import { HttpClientService } from '../../../../services/common/http-client.service';
import { SpinnerLoadingService } from '../../../../services/ui/spinner-loading.service';
import ResultResponseType from '../../../../models/responseType/ResultResponseType';
import GetAllHomeDataType from '../../../../models/DTOs/WebUIDTOs/GetAllHomeDataType';
import { TranslateService } from '@ngx-translate/core';
import {NgIf} from "@angular/common"
@Component({
  selector: 'app-home',
  imports: [
    HomesliderComponent,
    DiscountSectionComponent,
    TopCategorySectionComponent,
    NewArriwalSectionComponent,
    NgIf
  ],
  standalone: true,
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent{
  constructor(
    private httpClientService: HttpClientService,
    private spinnerService: SpinnerLoadingService,
    private translateService:TranslateService
  ) {
translateService.onLangChange.subscribe(lang=>{

  if (lang) {
    
    this.httpClientService.get<ResultResponseType<GetAllHomeDataType>>({controller:"Home",action:"GetAllData"})
    .subscribe({next:(response:ResultResponseType<GetAllHomeDataType>)=>{
   if (response?.isSuccess) {
     this.HomeDataSignal.set(response)
   }
    }})
  }
})


  }
HomeDataSignal=signal<ResultResponseType<GetAllHomeDataType>>(null)

}
