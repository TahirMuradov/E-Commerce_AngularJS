import { Injectable } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';

@Injectable({
  providedIn: 'root'
})
export class SpinnerLoadingService {

  constructor(private spinnerService:NgxSpinnerService) { }
  spinerShow(){
this.spinnerService.show()
  }
  spinerHide(){
    this.spinnerService.hide()
  }
}
