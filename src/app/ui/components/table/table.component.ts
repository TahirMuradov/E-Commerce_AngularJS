import { AfterViewInit, Component, EventEmitter, input, Input, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import PaginatedListType from '../../../models/responseType/PaginatedListType';
import ResultResponseType from '../../../models/responseType/ResultResponseType';
import { RouterLink } from '@angular/router';
import { PaginationComponentComponent } from "../pagination-component/pagination-component.component";

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink, PaginationComponentComponent],
  templateUrl: './table.component.html',
})
export class TableComponent<TDataType> implements AfterViewInit {

  constructor(public translateService:TranslateService) {
     //  this.columnNames.push( this.translateService.instant("colum1"))
   }
//result data
  @Input({ required: true }) responseApi: ResultResponseType<PaginatedListType< TDataType>>;;
  //fro custom Colum Names
  @Input({ required: false}) columnNames: string[] = [];
  //for delete action link only part of static
@Input({required:true}) deleteActionLink:string;
@Input({required:true}) editActionLink:string;

@Output() searchEvent:EventEmitter<string>=new EventEmitter();
@Output() pageEvent:EventEmitter<number>=new EventEmitter();

  searchTerm: string = '';
  currentPage: number = 1;
  pageSize: number = 5;

   ngAfterViewInit(): void {

console.log(this.responseApi)
  if (this.responseApi.data.paginatedData.length > 0) {
    const fieldNames = Object.keys(this.responseApi.data.paginatedData[0]);
    this.columnNames=fieldNames

  } else {
    console.log('No data to extract field names.');
  }
  }

onChangeSearchInput(e){
 
this.searchEvent.emit(e)
}
onChangePage(e){
  console.log(e)
this.pageEvent.emit(e)
}

isString(value: any): value is string {
  return typeof value === 'string';
}

isNumber(value: any): value is number {
  return typeof value === 'number';
}

isBoolean(value: any): value is boolean {
  return typeof value === 'boolean';
}

isArray(value: any): value is any[] {
  return Array.isArray(value);
}

isObject(value: any): value is object {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}
getObjectKeys(obj: object): string[] {

  
  return Object.keys(obj);

}


  // goToPage(page: number) {
  //   if (page >= 1 && page <= this.totalPages) {
  //     this.currentPage = page;
  //   }
  // }
}
