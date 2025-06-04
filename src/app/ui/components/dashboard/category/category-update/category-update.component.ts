import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClientService } from '../../../../../services/common/http-client.service';
import {
  CustomToastrService,
  ToastrMessageType,
  ToastrPosition,
} from '../../../../../services/ui/custom-toastr.service';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators,
  ValidatorFn,
  ValidationErrors,
  ReactiveFormsModule,
} from '@angular/forms';

import { NgFor, NgIf } from '@angular/common';
import GetCategoryDetailType from '../../../../../models/DTOs/CategoryDTOs/GetCategoryDetailType';
import ResultResponseType from '../../../../../models/responseType/ResultResponseType';
import { TranslateService } from '@ngx-translate/core';
import UpdateCategoryType from '../../../../../models/DTOs/CategoryDTOs/UpdateCategoryType';

@Component({
  selector: 'app-category-update',
  standalone: true,
  imports: [NgIf, NgFor, ReactiveFormsModule],
  templateUrl: './category-update.component.html',
  styleUrl: './category-update.component.css',
})
export class CategoryUpdateComponent {
  categoryId: string | null = null;
  frm: FormGroup;

  constructor(
    private activatedRoute: ActivatedRoute,
    public translateService: TranslateService,
    private formBuilder: FormBuilder,
    private toastr: CustomToastrService,
    private httpClient: HttpClientService,
    private router: Router
  ) {
    const paramId = this.activatedRoute.snapshot.params['Id'];
    this.categoryId = paramId;
    this.frm = this.formBuilder.group(
      {},
      {
        validators: this.supportedLangsValidator(
          this.translateService.getLangs()
        ),
            validaors: this.requiredLangsValidator(
          this.translateService.getLangs()
        )
      }
    );

    this.frm.addControl('isFeatured', this.formBuilder.control(false));

    this.httpClient
      .get<ResultResponseType<GetCategoryDetailType>>({
        controller: 'Category',
        action: 'GetCategoryDetailById',
        queryString: `id=${this.categoryId}`,
      })
      .subscribe({
        next: (response) => {
          if (response?.isSuccess && response.data?.categoryContent) {
            for (const [lang, value] of Object.entries(
              response.data.categoryContent
            )) {
              this.frm.addControl(
                `CategoryName${lang}`,
                this.formBuilder.control(value, [
                  Validators.required,
                  Validators.minLength(1),
                ])
              );
            }
            this.controlsReady = true;
          }
        },
      });
  }

  controlsReady: boolean = false;

  onSubmit() {
    if (this.frm.valid) {
        const ContentDataForKeyValue = this.translateService
        .getLangs()
        .map((locale) => ({
          key: locale,
          value: this.frm.controls[`CategoryName${locale}`].value,
        }));

      const bodyData:UpdateCategoryType = {
        id:this.categoryId,
        categoryContent: ContentDataForKeyValue.reduce((acc, item) => {
          acc[item.key] = item.value;
          return acc;
        }, {}),
        isFeatured: this.frm.controls['isFeatured'].value,
      };
      this.httpClient
        .put<ResultResponseType<null>, UpdateCategoryType>(
          { controller: 'Category', action: 'UpdateCategory' },
        bodyData
        )
        .subscribe({
          next: (response: ResultResponseType<null>) => {
            if (response?.isSuccess) {
               this.router.navigate(['/dashboard/categories/1']);
            }
          },
        });
    }  else {
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
