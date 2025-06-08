import { Component, effect, signal } from '@angular/core';
import { TableComponent } from "../../../table/table.component";
import { HttpClientService } from '../../../../../services/common/http-client.service';
import ResultResponseType from '../../../../../models/responseType/ResultResponseType';
import PaginatedListType from '../../../../../models/responseType/PaginatedListType';
import GetProductType from '../../../../../models/DTOs/ProductDTOs/GetProductType';
import {NgIf} from"@angular/common"
@Component({
  selector: 'app-product-table',
  imports: [NgIf,TableComponent],
  templateUrl: './product-table.component.html',
  styleUrl: './product-table.component.css'
})
export class ProductTableComponent {

  constructor(private httpClientService: HttpClientService) {
    effect(() => {
      const params = this.requestParamsSignal();
      if (!params) return;

      this.requestForGetProducts();
    });
  }

  requestParamsSignal = signal<{ search: string | null; page: number }>({
    page: 1,
    search: '',
  });
  ProductResponse: ResultResponseType<PaginatedListType<GetProductType[]>>;
  deleteLink: string = 'deleteLink';
  edit: string = '/dashboard/product/edit';
  private timeout: any = null;
  requestForGetProducts(){
    this.httpClientService
      .get({
        controller: 'Product',
        action: 'GetAllProductByPage',
        queryString: `page=${this.requestParamsSignal().page}&search=${
          this.requestParamsSignal().search ?? ''
        }`,
      })
      .subscribe({
        next: (
          response: ResultResponseType<PaginatedListType<GetProductType[]>>
        ) => {
          if (response?.isSuccess) {
            this.ProductResponse = response;

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
    if (this.ProductResponse.data.page != page && page > 0) {
      this.requestParamsSignal.set({
        page: page,
        search: this.requestParamsSignal().search,
      });
    }
  }
}
