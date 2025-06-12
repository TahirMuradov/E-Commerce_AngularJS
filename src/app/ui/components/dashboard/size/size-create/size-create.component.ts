import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { CustomToastrService, ToastrMessageType, ToastrPosition } from '../../../../../services/ui/custom-toastr.service';
import { HttpClientService } from '../../../../../services/common/http-client.service';
import { Router } from '@angular/router';
import {NgIf} from "@angular/common"
import ResultResponseType from '../../../../../models/responseType/ResultResponseType';
import AddSizeType from '../../../../../models/DTOs/SizeDTOs/AddSizeType';
@Component({
  selector: 'app-size-create',
  imports: [NgIf,ReactiveFormsModule],
  standalone:true,
  templateUrl: './size-create.component.html',
  styleUrl: './size-create.component.css'
})
export class SizeCreateComponent {

  constructor(
     public translateService: TranslateService,
    private formBuilder: FormBuilder,
    private toastr: CustomToastrService,
    private httpClient: HttpClientService,
    private roter: Router
  ) { 
        this.frm = formBuilder.group(
      {
        size: ['', [Validators.required]],
      },
   
    );
   }

  frm: FormGroup;



  onSubmit(){
if (this.frm.valid) {
  this.httpClient.post<ResultResponseType<null>,AddSizeType>({controller:"Size",action:"AddSize"},{size:this.frm.controls["size"].value})
  .subscribe({
    next:(response:ResultResponseType<null>)=>{
if (response.isSuccess) {
  this.roter.navigate(['/dashboard/sizes/1'])
}
    }
  })
}else{
      const errorMessages: string[] = [];

      const fieldValidationKeys: {
        [key: string]: { [errorKey: string]: string };
      } = {
        size:{ required: 'VALIDATION.SizeCrud.SizeContentRequired' ,
          minLength:"VALIDATION.SizeCrud.SizeContentMinLength"
        },
  
      };

      for (const field in fieldValidationKeys) {
        console.log(field)
        const controlErrors = this.frm.controls[field]?.errors;
        if (controlErrors) {
          for (const errorKey in controlErrors) {
            const translationKey = fieldValidationKeys[field][errorKey];
            if (translationKey) {
              errorMessages.push(this. translateService.instant(translationKey));
            }
          }
        }
      }



      this.toastr.message(errorMessages.join('\n'), 'Info', {
        messageType: ToastrMessageType.Info,
        position: ToastrPosition.BottomRight,
      });
    }
  }
}
