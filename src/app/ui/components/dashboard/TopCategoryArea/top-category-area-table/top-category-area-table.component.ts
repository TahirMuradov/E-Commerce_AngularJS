import { Component, effect, signal } from '@angular/core';
import { HttpClientService } from '../../../../../services/common/http-client.service';
import ResultResponseType from '../../../../../models/responseType/ResultResponseType';
import PaginatedListType from '../../../../../models/responseType/PaginatedListType';
import GetTopCategoryAreaType from '../../../../../models/DTOs/WebUIDTOs/TopCategoryAreaDTOs/GetTopCategoryAreaType';
import { TableComponent } from '../../../table/table.component';
import {NgIf} from "@angular/common"
@Component({
  selector: 'app-top-category-area-table',
  imports: [TableComponent, NgIf],
  standalone:true,
  templateUrl: './top-category-area-table.component.html',
  styleUrl: './top-category-area-table.component.css'
})
export class TopCategoryAreaTableComponent {

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

  TopCategoryAreaResponse=signal<ResultResponseType<PaginatedListType<GetTopCategoryAreaType>>>(null);
  
  edit: string = '/dashboard/topcategoryarea/edit';
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
    if (this.TopCategoryAreaResponse().data.page != page && page > 0) {
      this.requestParamsSignal.set({
        page: page,
        search: this.requestParamsSignal().search,
      });
    }
  }
  requestForGetHomeSliderItem() {
    this.httpClientService
      .get({
        controller: 'TopCategoryarea',
        action: 'GetTopCategoryAreaByPageOrSearch',
        queryString: `page=${this.requestParamsSignal().page}&search=${
          this.requestParamsSignal().search ?? ''
        }`,
      })
      .subscribe({
        next: (
          response: ResultResponseType<PaginatedListType<GetTopCategoryAreaType>>
        ) => {
          if (response?.isSuccess) {
            this.TopCategoryAreaResponse.set(response);
        
          }
        }      
      });
  }
  onItemDeleted(id: string) {


  const filteredData = this.TopCategoryAreaResponse()?.data.paginatedData.filter(
    (item) => item.id !== id
  );


  this.TopCategoryAreaResponse.set({
    ...this.TopCategoryAreaResponse(),
    data: {
      ...this.TopCategoryAreaResponse().data,
      paginatedData: [...filteredData] 
    }
  });

}
}
