import { Component, effect, signal } from '@angular/core';
import ResultResponseType from '../../../../../models/responseType/ResultResponseType';
import PaginatedListType from '../../../../../models/responseType/PaginatedListType';
import GetSizeType from '../../../../../models/DTOs/SizeDTOs/GetSizeType';
import { HttpClientService } from '../../../../../services/common/http-client.service';
import { TableComponent } from "../../../table/table.component";
import {NgIf} from "@angular/common";
@Component({
  selector: 'app-size-table',
  imports: [NgIf,TableComponent],
  templateUrl: './size-table.component.html',
  styleUrl: './size-table.component.css'
})
export class SizeTableComponent {

  constructor(private httpClientService: HttpClientService) {
    effect(() => {
      const params = this.requestParamsSignal();
      if (!params) return;

      this.requestForGetSizes();
    });
  }

  requestParamsSignal = signal<{ search: string | null; page: number }>({
    page: 1,
    search: '',
  });
deleteLink: string = 'deleteLink';
  edit: string = '/dashboard/size';
    sizeResponse: ResultResponseType<PaginatedListType<GetSizeType[]>>;
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
    if (this.sizeResponse.data.page != page && page > 0) {
      this.requestParamsSignal.set({
        page: page,
        search: this.requestParamsSignal().search,
      });
    }
  }
    requestForGetSizes() {
      this.httpClientService
        .get({
          controller: 'Size',
          action: 'GetAllSizesByPage',
          queryString: `page=${this.requestParamsSignal().page}&search=${
            this.requestParamsSignal().search ?? ''
          }`,
        })
        .subscribe({
          next: (
            response: ResultResponseType<PaginatedListType<GetSizeType[]>>
          ) => {
            console.log(response)
            if (response) {
              this.sizeResponse = response;
            }
          },
          error(err) {
            console.log(err);
          },
        });
    }
}
