import { Component, effect, signal } from '@angular/core';
import ResultResponseType from '../../../../../models/responseType/ResultResponseType';
import PaginatedListType from '../../../../../models/responseType/PaginatedListType';
import GetShippingMethodType from '../../../../../models/DTOs/ShippingMethodDTOs/GetShippingMethodType';
import { HttpClientService } from '../../../../../services/common/http-client.service';
import { TableComponent } from "../../../table/table.component";
import{NgIf,NgFor} from "@angular/common"

@Component({
  selector: 'app-shipping-method-table',
  imports: [NgIf, TableComponent],
  templateUrl: './shipping-method-table.component.html',
  styleUrl: './shipping-method-table.component.css'
})
export class ShippingMethodTableComponent {

  constructor(private httpClientService: HttpClientService) {
    effect(() => {
      const params = this.requestParamsSignal();
      if (!params) return;

      this.requestForGetShippingMethod();
    });
  }
  requestParamsSignal = signal<{ search: string | null; page: number }>({
    page: 1,
    search: '',
  });

  shippingMethodResponse=signal< ResultResponseType<PaginatedListType<GetShippingMethodType>>>(null);
  edit: string = '/dashboard/shippingmethod/edit';
  private timeout: any = null;

    requestForGetShippingMethod(){
      this.httpClientService
        .get({
          controller: 'ShippingMethod',
          action: 'GetAllShippingMethodsByPage',
          queryString: `page=${this.requestParamsSignal().page}&search=${
            this.requestParamsSignal().search ?? ''
          }`,
        })
        .subscribe({
          next: (
            response: ResultResponseType<PaginatedListType<GetShippingMethodType>>
          ) => {
            if (response?.isSuccess) {
              this.shippingMethodResponse.set(response);
  
            }
          },
          error(err) {
            console.log(err);
          },
        });
    }
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
      if (this.shippingMethodResponse().data.page != page && page > 0) {
        this.requestParamsSignal.set({
          page: page,
          search: this.requestParamsSignal().search,
        });
      }
    }
    onItemDeleted(id: string) {
   const filteredData = this.shippingMethodResponse()?.data.paginatedData.filter(
      (item) => item.id !== id
    );
  
  
    this.shippingMethodResponse.set({
      ...this.shippingMethodResponse() ,
      data: {
        ...this.shippingMethodResponse().data,
        paginatedData: [...filteredData] 
      }
    });
  }
}
