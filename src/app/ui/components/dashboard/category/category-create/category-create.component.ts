import { Component } from '@angular/core';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { NgFor } from '@angular/common';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import {
  CustomToastrService,
  ToastrMessageType,
  ToastrPosition,
} from '../../../../../services/ui/custom-toastr.service';
import AddCategoryType from '../../../../../models/DTOs/CategoryDTOs/AddCategoryType';
import { HttpClientService } from '../../../../../services/common/http-client.service';
import ResultResponseType from '../../../../../models/responseType/ResultResponseType';
import {  Router } from '@angular/router';
@Component({
  selector: 'app-category-create',
  imports: [NgFor, TranslateModule, ReactiveFormsModule],
  standalone: true,
  templateUrl: './category-create.component.html',
  styleUrl: './category-create.component.css',
})
export class CategoryCreateComponent {
  constructor(
    public translateService: TranslateService,
    private formBuilder: FormBuilder,
    private toastr: CustomToastrService,
    private httpClient:HttpClientService,
    private roter:Router
  ) {
    this.frm = formBuilder.group({},  {
    validators: this.supportedLangsValidator(this.translateService.getLangs())
  });
    for (const locale of this.translateService.getLangs()) {
      this.frm.addControl(
        `CategoryName${locale}`,
        this.formBuilder.control('', [
          Validators.required,
          Validators.minLength(1),
        ])
      );
    }
    this.frm.addControl(
      'isFeatured',
      this.formBuilder.control(false)
    );
  }
  frm: FormGroup;
  onSubmit() {
    if (this.frm.valid) {
      const ContentDataForKeyValue = this.translateService
        .getLangs()
        .map((locale) => ({
          key: locale,
          value: this.frm.controls[`CategoryName${locale}`].value,
        }));

      const data = {
        categoryContent: ContentDataForKeyValue.reduce((acc, item) => {
  acc[item.key] = item.value;
  return acc;
}, {}),
        isFeatured: this.frm.controls['isFeatured'].value,
      };
      this.httpClient.post<ResultResponseType<null>,AddCategoryType>({controller:"Category",action:"AddCategory"},data)
      .subscribe({
        next:(response)=>{
if (response?.isSuccess) {
  this.roter.navigate(["/dashboard/categories/1"])
}
        }
      })

    } else {
      const errorMessages: string[] = [];

      const fieldValidationKeys: {
        [key: string]: { [errorKey: string]: string };
      } = {
        firstname: { required: 'VALIDATION.FirstnameRequired' },
        lastname: { required: 'VALIDATION.LastnameRequired' },
        username: { required: 'VALIDATION.UsernameRequired' },
        email: {
          required: 'VALIDATION.EmailRequired',
          email: 'VALIDATION.EmailType',
        },
        phoneNumber: {
          required: 'VALIDATION.PhoneRequired',
          pattern: 'VALIDATION.PhonePattern',
        },
        password: {
          required: 'VALIDATION.RequiredPassword',
          pattern: 'VALIDATION.PasswordPattern',
        },
        confirmPassword: {
          required: 'VALIDATION.ConfirmPasswordRequired',
        },
        adress: {
          required: 'VALIDATION.AddressRequired',
        },
      };

      for (const field in fieldValidationKeys) {
        const controlErrors = this.frm.controls[field]?.errors;
        if (controlErrors) {
          for (const errorKey in controlErrors) {
            const translationKey = fieldValidationKeys[field][errorKey];
            if (translationKey) {
              errorMessages.push(this.translateService.instant(translationKey));
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
   supportedLangsValidator(supportedLangs: string[]): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
 
    const controls = control['controls'];
    const invalidLangKeys = Object.keys(controls)
      .filter(key => key.startsWith('CategoryName'))
      .map(key => key.replace('CategoryName', ''))
      .filter(locale => !supportedLangs.includes(locale));

    if (invalidLangKeys.length > 0) {
      return { unsupportedLangs: invalidLangKeys };
    }

    return null;
  };
}
}
