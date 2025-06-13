import { AfterViewInit, Component, effect, OnInit, signal } from '@angular/core';
import { HomesliderComponent } from '../homeslider/homeslider.component';
import { DiscountSectionComponent } from '../discount-section/discount-section.component';
import { TopCategorySectionComponent } from '../top-category-section/top-category-section.component';
import { NewArriwalSectionComponent } from '../new-arriwal-section/new-arriwal-section.component';
import { HttpClientService } from '../../../../services/common/http-client.service';
import { SpinnerLoadingService } from '../../../../services/ui/spinner-loading.service';
import ResultResponseType from '../../../../models/responseType/ResultResponseType';
import GetAllHomeDataType from '../../../../models/DTOs/WebUIDTOs/GetAllHomeDataType';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import {NgIf} from "@angular/common"
import { homeSliderData } from '../../../../models/ui/HomeSliderDataType';
@Component({
  selector: 'app-home',
  imports: [
    HomesliderComponent,
    DiscountSectionComponent,
    TopCategorySectionComponent,
    NewArriwalSectionComponent,
    NgIf,TranslateModule
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
effect(()=>{
  const HomeDataSignal=this.HomeDataSignal()
  if (HomeDataSignal) {
    console.log(HomeDataSignal)
  }
})
 
translateService.onLangChange.subscribe(lang=>{

this.getHomeData()
})


  }

HomeDataSignal=signal<ResultResponseType<GetAllHomeDataType>>(null)
ngOnInit(){
  
    this.getHomeData() 
}
getHomeData(){
   this.httpClientService.get<ResultResponseType<GetAllHomeDataType>>({controller:"Home",action:"GetAllData"})
    .subscribe({next:(response:ResultResponseType<GetAllHomeDataType>)=>{
   if (response?.isSuccess) {

     this.HomeDataSignal.set(response)
   }
    }
  
  })
}
}
