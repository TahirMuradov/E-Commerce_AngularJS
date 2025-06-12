import { Component, effect, signal } from '@angular/core';
import ResultResponseType from '../../../../../models/responseType/ResultResponseType';
import PaginatedListType from '../../../../../models/responseType/PaginatedListType';
import GetDisCountAreaType from '../../../../../models/DTOs/WebUIDTOs/DisCountArea/GetDisCountAreaType';
import { HttpClientService } from '../../../../../services/common/http-client.service';
import { TableComponent } from '../../../table/table.component';
import {NgIf} from"@angular/common"
@Component({
  selector: 'app-dis-count-area-table',
  imports: [NgIf,TableComponent],
  standalone:true,
  templateUrl: './dis-count-area-table.component.html',
  styleUrl: './dis-count-area-table.component.css'
})
export class DisCountAreaTableComponent {

  constructor(private httpClientService: HttpClientService) {
    effect(() => {
      const params = this.requestParamsSignal();
      if (!params) return;
  this.requestForGetDisCountAreas();

    });
  }

  requestParamsSignal = signal<{ search: string | null; page: number }>({
    page: 1,
    search: '',
  });

  DisCountAreaResponse=signal<ResultResponseType<PaginatedListType<GetDisCountAreaType>>>(null);
  
  edit: string = '/dashboard/discountarea/edit';
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
    if (this.DisCountAreaResponse().data.page != page && page > 0) {
      this.requestParamsSignal.set({
        page: page,
        search: this.requestParamsSignal().search,
      });
    }
  }
  requestForGetDisCountAreas() {
    this.httpClientService
      .get({
        controller: 'DisCountArea',
        action: 'GetDisCountAreaForTable',
        queryString: `page=${this.requestParamsSignal().page}&search=${
          this.requestParamsSignal().search ?? ''
        }`,
      })
      .subscribe({
        next: (
          response: ResultResponseType<PaginatedListType<GetDisCountAreaType>>
        ) => {
          if (response?.isSuccess) {
            this.DisCountAreaResponse.set(response);
       
          }
        }      
      });
  }
  onItemDeleted(id: string) {


  const filteredData = this.DisCountAreaResponse()?.data.paginatedData.filter(
    (item) => item.id !== id
  );


  this.DisCountAreaResponse.set({
    ...this.DisCountAreaResponse(),
    data: {
      ...this.DisCountAreaResponse().data,
      paginatedData: [...filteredData] 
    }
  });

}
}
