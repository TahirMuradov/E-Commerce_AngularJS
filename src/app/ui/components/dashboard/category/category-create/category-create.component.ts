import { Component } from '@angular/core';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { NgFor, NgIf } from '@angular/common';
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
import { Router } from '@angular/router';
@Component({
  selector: 'app-category-create',
  imports: [NgIf, NgFor, TranslateModule, ReactiveFormsModule],
  standalone: true,
  templateUrl: './category-create.component.html',
  styleUrl: './category-create.component.css',
})
export class CategoryCreateComponent {
  constructor(
    public translateService: TranslateService,
    private formBuilder: FormBuilder,
    private toastr: CustomToastrService,
    private httpClient: HttpClientService,
    private router: Router
  ) {
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
        `CategoryName${locale}`,
        this.formBuilder.control('', [
          Validators.required,
          Validators.minLength(3),
        ])
      );
    }
    this.frm.addControl('isFeatured', this.formBuilder.control(false));
    this.controlsReady = true;
  }
  controlsReady: boolean = false;
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
      this.httpClient
        .post<ResultResponseType<null>, AddCategoryType>(
          { controller: 'Category', action: 'AddCategory' },
          data
        )
        .subscribe({
          next: (response) => {
            if (response?.isSuccess) {
              this.router.navigate(['/dashboard/categories/1']);
            }
          },
        });
    } else {
      const errorMessages: string[] = [];

      for (const key of Object.keys(this.frm.controls)) {
        const controlErrors = this.frm.controls[key]?.errors;
        if (controlErrors) {
          for (const errorKey of Object.keys(controlErrors)) {
            let translationKey = '';

            if (
              errorKey === 'required' &&
              !errorMessages.includes(
                'VALIDATION.CategoryCRUD.CategoryNameRequired'
              )
            ) {
              translationKey = 'VALIDATION.CategoryCRUD.CategoryNameRequired';
            }

            if (errorKey === 'minlength') {
              translationKey = 'VALIDATION.CategoryCRUD.CategoryNameMinLength';
            }

            if (translationKey) {
              errorMessages.push(this.translateService.instant(translationKey));
            }
          }
        }
      }

      const formErrors = this.frm.errors;
      if (formErrors) {
        if (formErrors['unsupportedLangs']) {
          const langs = formErrors['unsupportedLangs'].join(', ');
          errorMessages.push(
            this.translateService.instant('VALIDATION.UnsupportedLangs', {
              langs,
            })
          );
        }

        if (formErrors['missingLangs']) {
          const langs = formErrors['missingLangs'].join(', ');
          errorMessages.push(
            this.translateService.instant('VALIDATION.MissingLangs', { langs })
          );
        }
      }

      if (errorMessages.length > 0) {
        this.toastr.message(errorMessages.join('\n'), 'Info', {
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
        .filter((key) => key.startsWith('CategoryName'))
        .map((key) => key.replace('CategoryName', ''))
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
          !controls[`CategoryName${locale}`] ||
          !controls[`CategoryName${locale}`].value?.trim()
      );

      if (missingLangKeys.length > 0) {
        return { missingLangs: missingLangKeys };
      }

      return null;
    };
  }
}
