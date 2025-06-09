import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { CustomToastrService, ToastrMessageType, ToastrPosition } from '../../../../../services/ui/custom-toastr.service';
import { HttpClientService } from '../../../../../services/common/http-client.service';
import { Router } from '@angular/router';
import { NgFor, NgIf } from '@angular/common';
import ResultResponseType from '../../../../../models/responseType/ResultResponseType';
import AddDisCountAreaType from '../../../../../models/DTOs/WebUIDTOs/DisCountArea/AddDiscountAreaType';

@Component({
  selector: 'app-dis-count-area-create',
  imports:  [NgIf, NgFor, TranslateModule, ReactiveFormsModule],
  standalone:true,
  templateUrl: './dis-count-area-create.component.html',
  styleUrl: './dis-count-area-create.component.css'
})
export class DisCountAreaCreateComponent {

constructor(    public translateService: TranslateService,
    private formBuilder: FormBuilder,
    private toastr: CustomToastrService,
    private httpClient: HttpClientService,
    private router: Router) {
          this.frm = formBuilder.group(
      {},
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
        `TitleContent${locale}`,
        this.formBuilder.control('', [
          Validators.required,
          Validators.minLength(3),
        ])
      );
            this.frm.addControl(
        `DescriptionContent${locale}`,
        this.formBuilder.control('', [
          Validators.required,
          Validators.minLength(3),
        ])
      )
    }

    this.controlsReady = true;
    }
  controlsReady: boolean = false;
  frm: FormGroup;

onSubmit(){
if (this.frm.valid) {
    const TitleContentForKeyValue = this.translateService
        .getLangs()
        .map((locale) => ({
          key: locale,
          value: this.frm.controls[`TitleContent${locale}`].value,
        })).reduce((acc, item) => {
          acc[item.key] = item.value;
          return acc;
        }, {});
          const DescriptionContentForKeyValue = this.translateService
        .getLangs()
        .map((locale) => ({
          key: locale,
          value: this.frm.controls[`DescriptionContent${locale}`].value,
        })).reduce((acc, item) => {
          acc[item.key] = item.value;
          return acc;
        }, {});
           this.httpClient
                .post<ResultResponseType<null>, AddDisCountAreaType>(
                  { controller: 'DisCountArea', action: 'AddDiscountArea' },
                  {
                    DescriptionContent:DescriptionContentForKeyValue,
                    TitleContent:TitleContentForKeyValue
                  }
                )
                .subscribe({
                  next: (response) => {
                    if (response?.isSuccess) {
                      
                      this.router.navigate(['/dashboard/discountareas/1']);
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

        errorMessage = this.translateService.instant(`VALIDATION.DisCountAreaCrud.${validationKey+key}`);

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
      .filter((key) => key.startsWith('DescriptionContent') || key.startsWith('TitleContent'))
      .map((key) => key.replace(/^DescriptionContent|^TitleContent/, ''))
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
        !controls[`TitleContent${locale}`]?.value?.trim() ||
        !controls[`DescriptionContent${locale}`]?.value?.trim()
    );

    if (missingLangKeys.length > 0) {
      return { missingLangs: missingLangKeys };
    }
    return null;
  };
}
  }
