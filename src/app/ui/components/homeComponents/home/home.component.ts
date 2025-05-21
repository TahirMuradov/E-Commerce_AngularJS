import { Component, OnInit } from '@angular/core';
import { HomesliderComponent } from '../homeslider/homeslider.component';
import { DiscountSectionComponent } from '../discount-section/discount-section.component';
import { TopCategorySectionComponent } from '../top-category-section/top-category-section.component';
import { NewArriwalSectionComponent } from '../new-arriwal-section/new-arriwal-section.component';
import { HttpClientService } from '../../../../services/common/http-client.service';
import { NgxSpinnerComponent, NgxSpinnerService } from 'ngx-spinner';
import { SpinnerLoadingService } from '../../../../services/ui/spinner-loading.service';

@Component({
  selector: 'app-home',
  imports: [
    HomesliderComponent,
    DiscountSectionComponent,
    TopCategorySectionComponent,
    NewArriwalSectionComponent,
  ],
  standalone: true,
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit {
  constructor(
    private httpClientService: HttpClientService,
    private spinnerService: SpinnerLoadingService
  ) {}
  ngOnInit() {
    this.spinnerService.spinerShow();

    this.httpClientService
      .get({ baseUrl: 'https://dummyjson.com', controller: 'products' })
      .subscribe({
        next: (response) => {
          if (response) {
            this.spinnerService.spinerHide()
     
          }
        },
        error(err) {
          console.log(err)
        },
      });
  }
  GetCurrentUserInfo() {
    this.httpClientService
      .get({ fullEndPoint: 'https://dummyjson.com/auth/me' })
      .subscribe((response) => {
        console.log(JSON.stringify(response));
      });
  }
}
