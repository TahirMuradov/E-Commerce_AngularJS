import { Component, effect, signal } from '@angular/core';
import ResultResponseType from '../../../../../models/responseType/ResultResponseType';
import PaginatedListType from '../../../../../models/responseType/PaginatedListType';
import GetUserForTableType from '../../../../../models/DTOs/UserDTOs/GetUserForTableType';
import { HttpClientService } from '../../../../../services/common/http-client.service';
import { TableComponent } from "../../../table/table.component";
import {NgIf} from "@angular/common"
@Component({
  selector: 'app-usertable',
  imports: [NgIf,TableComponent],
  templateUrl: './usertable.component.html',
  styleUrl: './usertable.component.css'
})
export class UsertableComponent {



  constructor(private httpClientService: HttpClientService) {
 
    effect(() => {
      const params = this.requestParamsSignal();
      if (!params) return;
  this.requestForGetUsers();

    });
  }

  requestParamsSignal = signal<{ search: string | null; page: number }>({
    page: 1,
    search: '',
  });

UsersResponseSignal=signal<ResultResponseType<PaginatedListType<GetUserForTableType>>>(null);
  
  edit: string = '/dashboard/user/edit';
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
    if (this.UsersResponseSignal().data.page != page && page > 0) {
      this.requestParamsSignal.set({
        page: page,
        search: this.requestParamsSignal().search,
      });
    }
  }
  requestForGetUsers() {
    this.httpClientService
      .get({
        controller: 'Auth',
        action: 'GetAllUserByPageOrSearch',
        queryString: `page=${this.requestParamsSignal().page}&search=${
          this.requestParamsSignal().search ?? ''
        }`,
      })
      .subscribe({
        next: (
          response: ResultResponseType<PaginatedListType<GetUserForTableType>>
        ) => {
          if (response?.isSuccess) {
            this.UsersResponseSignal.set(response);
       
          }
        }      
      });
  }
  onItemDeleted(id: string) {


  const filteredData = this.UsersResponseSignal()?.data.paginatedData.filter(
    (item) => item.id !== id
  );


  this.UsersResponseSignal.set({
    ...this.UsersResponseSignal(),
    data: {
      ...this.UsersResponseSignal().data,
      paginatedData: [...filteredData] 
    }
  });

}

}
