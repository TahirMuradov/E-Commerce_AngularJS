import { Component, effect, signal } from '@angular/core';
import ResultResponseType from '../../../../../models/responseType/ResultResponseType';
import PaginatedListType from '../../../../../models/responseType/PaginatedListType';
import GetPaymentMethodType from '../../../../../models/DTOs/PaymentMethodDTOs/GetPaymentMethodType';
import { HttpClientService } from '../../../../../services/common/http-client.service';
import { TableComponent } from '../../../table/table.component';
import {NgIf} from"@angular/common"

@Component({
  selector: 'app-payment-method-table',
  imports: [NgIf,TableComponent],
  standalone:true,
  templateUrl: './payment-method-table.component.html',
  styleUrl: './payment-method-table.component.css'
})
export class PaymentMethodTableComponent {
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

  PaymentMethodAreaResponseSignal=signal<ResultResponseType<PaginatedListType<GetPaymentMethodType>>>(null);
  
  edit: string = '/dashboard/paymentmethod/edit';
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
      if (this.PaymentMethodAreaResponseSignal().data.page != page && page > 0) {
        this.requestParamsSignal.set({
          page: page,
          search: this.requestParamsSignal().search,
        });
      }
    }
    requestForGetDisCountAreas() {
      this.httpClientService
        .get({
          controller: 'PaymentMethod',
          action: 'GetAllPaymentMethodsByPageOrSearch',
          queryString: `page=${this.requestParamsSignal().page}&search=${
            this.requestParamsSignal().search ?? ''
          }`,
        })
        .subscribe({
          next: (
            response: ResultResponseType<PaginatedListType<GetPaymentMethodType>>
          ) => {
            if (response?.isSuccess) {
              this.PaymentMethodAreaResponseSignal.set(response);
         
            }
          }      
        });
    }
    onItemDeleted(id: string) {
  
  
    const filteredData = this.PaymentMethodAreaResponseSignal()?.data.paginatedData.filter(
      (item) => item.id !== id
    );
  
  
    this.PaymentMethodAreaResponseSignal.set({
      ...this.PaymentMethodAreaResponseSignal(),
      data: {
        ...this.PaymentMethodAreaResponseSignal().data,
        paginatedData: [...filteredData] 
      }
    });
  
  }
}
