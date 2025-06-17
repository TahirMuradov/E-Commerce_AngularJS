import { AfterViewInit, Component, effect, OnDestroy, OnInit, signal } from '@angular/core';
import { HomesliderComponent } from '../homeslider/homeslider.component';
import { DiscountSectionComponent } from '../discount-section/discount-section.component';
import { TopCategorySectionComponent } from '../top-category-section/top-category-section.component';
import { NewArriwalSectionComponent } from '../new-arriwal-section/new-arriwal-section.component';
import { HttpClientService } from '../../../../services/common/http-client.service';
import ResultResponseType from '../../../../models/responseType/ResultResponseType';
import GetAllHomeDataType from '../../../../models/DTOs/WebUIDTOs/GetAllHomeDataType';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import {NgIf} from "@angular/common"
import { Subscription } from 'rxjs';
import { CookieManagerService } from '../../../../services/common/cookie-manager.service';
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
export class HomeComponent implements OnDestroy{
  constructor(
    private httpClientService: HttpClientService,
    private translateService:TranslateService
  ) {
effect(()=>{
  const HomeDataSignal=this.HomeDataSignal()
  if (HomeDataSignal) {
    console.log(HomeDataSignal)
  }
})
 
 this.translateSubscribe= translateService.onLangChange.subscribe(()=>{

this.getHomeData()

}) 


  }
  ngOnDestroy(): void {
      this.translateSubscribe.unsubscribe();
  }
 translateSubscribe:Subscription;

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
