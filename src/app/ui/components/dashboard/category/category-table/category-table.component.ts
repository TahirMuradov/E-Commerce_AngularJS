import { AfterViewInit, Component, OnInit } from '@angular/core';
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


}
searchInput?:string=null;
categoriesResponse:ResultResponseType<PaginatedListType<GetCategoryType[]>>;
deleteLink:string="deleteLink";
edit:string="editlink";
  private timeout: any = null;
ngOnInit(){
       this.httpClientService
    .get({ controller: 'Category',action:"GetAllCategoryByPage",queryString:"page=1" })
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
onChangeSearchInput(obj:any){
  console.log("Parent childdan gelen deyeri qebul etdi "+obj)
  this.Spinner.spinerShow()
    if (this.timeout) {
      clearTimeout(this.timeout);
    }
  this.timeout=setTimeout(()=>{
    console.log("FetchAtildi")
this.Spinner.spinerHide()
  },5000)

}

}
