import { AfterViewInit, Component, EventEmitter, input, Input, OnInit, Output, Signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import PaginatedListType from '../../../models/responseType/PaginatedListType';
import ResultResponseType from '../../../models/responseType/ResultResponseType';
import { RouterLink } from '@angular/router';
import { PaginationComponentComponent } from "../pagination-component/pagination-component.component";
import { environment } from '../../../../environments/environment';
import { HttpClientService } from '../../../services/common/http-client.service';

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink, PaginationComponentComponent],
  templateUrl: './table.component.html',
})
export class TableComponent<TDataType> implements OnInit {

  constructor(public translateService:TranslateService,
public httpClient:HttpClientService

  ) {
     //  this.columnNames.push( this.translateService.instant("colum1"))

   }

//result data
  @Input({ required: true }) responseApi:Signal< ResultResponseType<PaginatedListType< TDataType >>>;
  //fro custom Colum Names
  @Input({ required: false}) columnNames: string[] = [];
  //for delete action link only part of static

@Input({required:true}) editActionLink:string;
@Input({required:false}) deleteAction:string;
@Input({required:false}) controller:string;
@Output() searchEvent:EventEmitter<string>=new EventEmitter();
@Output() pageEvent:EventEmitter<number>=new EventEmitter();
@Output() itemDeleted = new EventEmitter<string>();

 searchTerm="";
  currentPage: number = 1;
  pageSize: number = 5;
apiDomain=environment.apiUrl;

  ngOnInit(): void {


  if (this.editActionLink && !this.editActionLink.startsWith('/')) {
  this.editActionLink = '/' + this.editActionLink;
}

  if (this.responseApi()?.data.paginatedData.length > 0) {
    const fieldNames = Object.keys(this.responseApi().data.paginatedData[0]);
    this.columnNames=fieldNames

  } else {
    console.log('No data to extract field names.');
  }
  }
  getCleanedImageUrl(url: string): string {
  if (!url) return '';

  return url.replace('/api/', '/');
}
onDelete(id:string){
if (this.deleteAction&&this.editActionLink) {
  
  this.httpClient.delete<ResultResponseType<null>>({controller:this.controller,action:this.deleteAction},id)
  .subscribe({
    next:(response:ResultResponseType<null>)=>{

      if (response.isSuccess) {
          this.itemDeleted.emit(id);
        }

    }
  })
}
  
}
onChangeSearchInput(){
this.searchEvent.emit(this.searchTerm)
}
onChangePage(e){
 
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

isImageUrl(url: string): boolean {

 
 if (typeof url !== "string" || !url.trim()) return false;
 
  const extensions = ['.jpg', '.jpeg', '.png', '.gif', '.webp', '.svg'];
  return extensions.some(ext => url.toLowerCase().endsWith(ext));
}

getType(value: any): string {
  if (typeof value === 'string') {
    return this.isImageUrl(value) ? 'array' : 'string';  
  }
  if (typeof value === 'number') return 'number';
  if (typeof value === 'boolean') return 'boolean';
  if (Array.isArray(value)) return 'array';
  if (value && typeof value === 'object') return 'object';
  return 'unknown';
}
trackById(index: number, item: any): string {
  return item.id; 
}
}
