import { Component, EventEmitter, input, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';

import PaginatedListType from '../../../models/responseType/PaginatedListType';
import{NgFor, NgClass} from"@angular/common"
@Component({
  selector: 'app-pagination-component',
  imports: [NgFor,NgClass],
  standalone:true,
  templateUrl: './pagination-component.component.html',
  styleUrl: './pagination-component.component.css'
})
export class PaginationComponentComponent implements  OnInit {

  @Input() pagination!: PaginatedListType<any>;
  @Output() pageChanged = new EventEmitter<any>();
   @Input({ required: true }) buttonColorClass!: string;
   @Input() activePageClass:string;
  
  pages: number[] =[];
 
  defaultPageClass = 'text-gray-900';

     ngOnInit(): void {
this.generatePages()
      this.activePageClass='bg-slate-800'

  }
  


  generatePages(): void {
    const total = this.pagination.totalPages;
    this.pages = [];
    for (let i = 1; i <= total; i++) {
      this.pages.push(i);
    }
  }

  changePage(page: number): void {
 
    if (page !== this.pagination.page) {
      this.pageChanged.emit(page);
    }
  }

  nextPage(): void {
    if (this.pagination.hasNextPage) {
      this.pageChanged.emit(this.pagination.page + 1);
    }
  }

  previousPage(): void {
    if (this.pagination.hasPreviousPage) {
      this.pageChanged.emit(this.pagination.page - 1);
    }
  }

}
