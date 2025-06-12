import { Component, effect, signal } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { CustomToastrService, ToastrMessageType, ToastrPosition } from '../../../../../services/ui/custom-toastr.service';
import { HttpClientService } from '../../../../../services/common/http-client.service';
import { ActivatedRoute, Router } from '@angular/router';
import ResultResponseType from '../../../../../models/responseType/ResultResponseType';
import UpdatePaymentMethodType from '../../../../../models/DTOs/PaymentMethodDTOs/UpdatePaymentMethodType';
import GetPaymentMethodDetailType from '../../../../../models/DTOs/PaymentMethodDTOs/GetPaymentMethodDetailType';
import {NgIf,NgFor} from "@angular/common";
@Component({
  selector: 'app-payment-method-update',
  imports: [NgIf,NgFor,ReactiveFormsModule],
  templateUrl: './payment-method-update.component.html',
  styleUrl: './payment-method-update.component.css'
})
export class PaymentMethodUpdateComponent {

  constructor(   
    private activatedRoute:ActivatedRoute,
    public translateService: TranslateService,
    private formBuilder: FormBuilder,
    private toastr: CustomToastrService,
    private httpClient: HttpClientService,
    private router: Router) {
const paramId=this.activatedRoute.snapshot.params["id"]
this.httpClient.get<ResultResponseType<GetPaymentMethodDetailType>>({controller:"PaymentMethod",action:"GetPaymentMethodById",queryString:`id=${paramId}`})
.subscribe({
  next:(response:ResultResponseType<GetPaymentMethodDetailType>)=>{
if (response?.isSuccess) {
  this.paymentMethodSignal.set(response.data)
}
  }
})

effect(()=>{
  const paymentMethodSignal=this.paymentMethodSignal();
  if (paymentMethodSignal) {
    this.frm = formBuilder.group(
  {isCash:[paymentMethodSignal.isCash]},
  {
  validators: [this.supportedLangsValidator(
    this.translateService.getLangs()
  ),
   this.requiredLangsValidator(
    this.translateService.getLangs()
  ),]
  }
  );
  for (const locale of this.translateService.getLangs()) {
  this.frm.addControl(
  `content${locale}`,
  this.formBuilder.control(paymentMethodSignal.content[locale], [
    Validators.required,
    Validators.minLength(3),
  ])
  );
  
  }
  
  this.controlsReady = true;
    
  }
})
    }

 controlsReady: boolean = false;
  frm: FormGroup;
paymentMethodSignal=signal<GetPaymentMethodDetailType>(null)

    onSubmit(){
if (this.frm.valid) {
    const contentForKeyValue = this.translateService
        .getLangs()
        .map((locale) => ({
          key: locale,
          value: this.frm.controls[`content${locale}`].value,
        })).reduce((acc, item) => {
          acc[item.key] = item.value;
          return acc;
        }, {});
       console.log(this.frm.controls["isCash"]?.value)
           this.httpClient
                .put<ResultResponseType<null>, UpdatePaymentMethodType>(
                  { controller: 'PaymentMethod', action: 'UdpatePaymentMethod' },
                  {
                    id:this.paymentMethodSignal().id,
                    content:contentForKeyValue,
                  isCash:this.frm.controls["isCash"]?.value
                  }
                )
                .subscribe({
                  next: (response) => {
                    if (response?.isSuccess) {
                      
                      this.router.navigate(['/dashboard/paymentmethods/1']);
                    }
                  },
                });
}else{
   const errorMessages: {key:string,value:string}[] = [];
  
         for (const key of Object.keys(this.frm.controls)) {
        const controlErrors: ValidationErrors = this.frm.controls[key]?.errors;
      
        if (controlErrors) {
        const validationKey=  Object.keys(controlErrors).toString()
         
          if (!errorMessages.some(x => x.key === validationKey)) {

       let errorMessage = '';

        errorMessage = this.translateService.instant(`VALIDATION.PaymentMethodCrud.${validationKey+key}`);

      errorMessages.push({
        key: validationKey,
        value: errorMessage
      });
     }
;
        }
      }
  
      const formErrors = this.frm.errors;
      if (formErrors) {
        if (formErrors['unsupportedLangs']) {
          const langs = formErrors['unsupportedLangs'].join(', ');
          errorMessages.push({key:"unsupportedLangs",value:
            this.translateService.instant('VALIDATION.UnsupportedLangs', {
              langs,
            })}
          );
        }

        if (formErrors['missingLangs']) {
          const langs = formErrors['missingLangs'].join(', ');
          errorMessages.push({ key:"missingLangs",value:this.translateService.instant('VALIDATION.MissingLangs', { langs })
        });
        }
      }

      if (errorMessages.length > 0) {
        this.toastr.message(errorMessages.reduce((acc, message) => {
        acc.push(message?.value);
        return acc;
      },[]).join('\n'), 'Info', {
          messageType: ToastrMessageType.Info,
          position: ToastrPosition.BottomRight,
        });
      }
  
  
}
}

supportedLangsValidator(supportedLangs: string[]): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const controls = control['controls'];
    const invalidLangKeys = Object.keys(controls)
      .filter((key) => key.startsWith('content'))
      .map((key) => key.replace(/^content/, ''))
      .filter((locale) => !supportedLangs.includes(locale));

    if (invalidLangKeys.length > 0) {
      return { unsupportedLangs: invalidLangKeys };
    }
    return null;
  };
}

requiredLangsValidator(requiredLangs: string[]): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const controls = control['controls'];
    const missingLangKeys = requiredLangs.filter(
      (locale) =>
        !controls[`content${locale}`]?.value?.trim()
    );

    if (missingLangKeys.length > 0) {
      return { missingLangs: missingLangKeys };
    }
    return null;
  };
}

}
