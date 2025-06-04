import { AfterViewInit, Component, effect, OnInit, Signal, signal } from '@angular/core';
import { HttpClientService } from '../../../../../services/common/http-client.service';
import Product from '../../../../../models/dummuyJsonDataTypes/ProductType';
import ResultResponseType from '../../../../../models/responseType/ResultResponseType';
import GetCategoryType from '../../../../../models/DTOs/CategoryDTOs/GetCategoryType';
import PaginatedListType from '../../../../../models/responseType/PaginatedListType';
import { TableComponent } from "../../../table/table.component";
import { NgIf } from '@angular/common';
import { SpinnerLoadingService } from '../../../../../services/ui/spinner-loading.service';
@Component({
  selector: 'app-category-table',
  imports: [TableComponent,NgIf],
  standalone:true,
  templateUrl: './category-table.component.html',
  styleUrl: './category-table.component.css'
})
export class CategoryTableComponent implements OnInit {

constructor(
    private httpClientService: HttpClientService,
    private Spinner :SpinnerLoadingService
) {
    effect(() => {
      const params = this.requestParamsSignal();
      if (!params) return;  

this.requestForGetCatigories()
   
  
   
    });

}
  requestParamsSignal=signal<{search:string|null,page:number}>({page:1,search:""});

categoriesResponse:ResultResponseType<PaginatedListType<GetCategoryType[]>>;
deleteLink:string="deleteLink";
edit:string="editlink";
  private timeout: any = null;
ngOnInit(){
this.requestForGetCatigories();
}
onChangeSearchInput(search:string){
if (this.timeout) {
  clearTimeout(this.timeout)
}

  this.timeout=setTimeout(()=>{


   this.requestParamsSignal.set({page:this.requestParamsSignal().page,search:search})
},1000)


}
onChangePage(page:number){
if (this.categoriesResponse.data.page!=page && page>0) {
  this.requestParamsSignal.set({page:page,search:this.requestParamsSignal().search})
}

}
requestForGetCatigories(){
           this.httpClientService
    .get({ controller: 'Category',action:"GetAllCategoryByPage",queryString:`page=${this.requestParamsSignal().page}&search=${this.requestParamsSignal().search??''}` })
    .subscribe({
      next: (response: ResultResponseType<PaginatedListType<GetCategoryType[]>>) => {

        if (response) {
   this.categoriesResponse=response

   
        }
      },
      error(err) {
        console.log(err)
      },
    });
}

}
