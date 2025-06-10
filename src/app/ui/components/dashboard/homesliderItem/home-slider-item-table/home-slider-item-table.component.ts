import { Component, effect, signal } from '@angular/core';
import ResultResponseType from '../../../../../models/responseType/ResultResponseType';
import PaginatedListType from '../../../../../models/responseType/PaginatedListType';
import GetHomeSliderItemType from '../../../../../models/DTOs/WebUIDTOs/HomeSliderItem/GetHomeSliderItemType';
import { HttpClientService } from '../../../../../services/common/http-client.service';
import { TableComponent } from '../../../table/table.component';
import { NgIf } from '@angular/common';
@Component({
  selector: 'app-home-slider-item-table',
  imports: [TableComponent, NgIf],
  templateUrl: './home-slider-item-table.component.html',
  styleUrl: './home-slider-item-table.component.css'
})
export class HomeSliderItemTableComponent {
  constructor(private httpClientService: HttpClientService) {
    effect(() => {
      const params = this.requestParamsSignal();
    
      if (!params) return;
      this.requestForGetHomeSliderItem();
    });
  }
    requestParamsSignal = signal<{ search: string | null; page: number }>({
    page: 1,
    search: '',
  });

  HomeSliderItemResponse=signal<ResultResponseType<PaginatedListType<GetHomeSliderItemType>>>(null);
  
  edit: string = '/dashboard/homeslideritem/edit';
  private timeout: any = null;
  onChangeSearchInput(search: string) {
    if (this.timeout) {
      clearTimeout(this.timeout);
    }

    this.timeout = setTimeout(() => {
      this.requestParamsSignal.set({
        page: this.requestParamsSignal().page,
        search: search,
      });
    }, 1000);
  }
  onChangePage(page: number) {
    if (this.HomeSliderItemResponse().data.page != page && page > 0) {
      this.requestParamsSignal.set({
        page: page,
        search: this.requestParamsSignal().search,
      });
    }
  }
  requestForGetHomeSliderItem() {
    this.httpClientService
      .get({
        controller: 'HomeSliderItem',
        action: 'GetAllHomeSliderItemByPageOrSearch',
        queryString: `page=${this.requestParamsSignal().page}&search=${
          this.requestParamsSignal().search ?? ''
        }`,
      })
      .subscribe({
        next: (
          response: ResultResponseType<PaginatedListType<GetHomeSliderItemType>>
        ) => {
          if (response?.isSuccess) {
            this.HomeSliderItemResponse.set(response);
            console.log(response)
          }
        }      
      });
  }
  onItemDeleted(id: string) {


  const filteredData = this.HomeSliderItemResponse()?.data.paginatedData.filter(
    (item) => item.id !== id
  );


  this.HomeSliderItemResponse.set({
    ...this.HomeSliderItemResponse(),
    data: {
      ...this.HomeSliderItemResponse().data,
      paginatedData: [...filteredData] 
    }
  });

}
}
