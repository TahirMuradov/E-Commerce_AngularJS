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

@Component({
  selector: 'app-category-update',
  standalone: true,
  imports: [NgIf, NgFor, ReactiveFormsModule],
  templateUrl: './category-update.component.html',
  styleUrl: './category-update.component.css',
})
export class CategoryUpdateComponent implements OnInit {
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
  ngOnInit(): void {}

  onSubmit() {
    if (this.frm.invalid) {
      return;
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
        .filter((key) => key.startsWith('CategoryName'))
        .map((key) => key.replace('CategoryName', ''))
        .filter((locale) => !supportedLangs.includes(locale));

      if (invalidLangKeys.length > 0) {
        return { unsupportedLangs: invalidLangKeys };
      }

      return null;
    };
  }
}
