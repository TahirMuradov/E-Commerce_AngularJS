import { Component, effect, signal } from '@angular/core';
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
import { TranslateService } from '@ngx-translate/core';
import { HttpClientService } from '../../../../../services/common/http-client.service';
import { ActivatedRoute, Router } from '@angular/router';
import GetShippingMethodDetailType from '../../../../../models/DTOs/ShippingMethodDTOs/GetShippingMethodDetailType';
import ResultResponseType from '../../../../../models/responseType/ResultResponseType';
import UpdateShippingMethodType from '../../../../../models/DTOs/ShippingMethodDTOs/UpdateShippingMethodType';
import {NgIf,NgFor} from"@angular/common"
@Component({
  selector: 'app-shipping-method-update',
  imports: [NgIf,NgFor,ReactiveFormsModule],
  templateUrl: './shipping-method-update.component.html',
  styleUrl: './shipping-method-update.component.css',
})
export class ShippingMethodUpdateComponent {
  constructor(
    private activatedRoute: ActivatedRoute,
    public translateService: TranslateService,
    private formBuilder: FormBuilder,
    private toastr: CustomToastrService,
    private httpClient: HttpClientService,
    private router: Router
  ) {
    const paramId = this.activatedRoute.snapshot.params['id'];

    httpClient
      .get<ResultResponseType<GetShippingMethodDetailType>>({
        controller: 'ShippingMethod',
        action: 'GetShippingMethodById',
        queryString: `id=${paramId}`,
      })
      .subscribe({
        next: (response: ResultResponseType<GetShippingMethodDetailType>) => {
          if (response?.isSuccess) {
            this.shippingMethodSignal.set(response.data);
          
          }
        },
      });
    effect(() => {
      const shippingMethodSignal = this.shippingMethodSignal();

      if (shippingMethodSignal) {
     
        this.frm = formBuilder.group(
          {
            price: [shippingMethodSignal.price, Validators.min(0)],
            disCountPrice: [shippingMethodSignal.disCount, Validators.min(0)],
          },
          {
            validators: [
              this.supportedLangsValidator(this.translateService.getLangs()),
              this.requiredLangsValidator(this.translateService.getLangs()),
            ],
          }
        );
        for (const locale of this.translateService.getLangs()) {
          this.frm.addControl(
            `content${locale}`,
            this.formBuilder.control(shippingMethodSignal.content[locale], [
              Validators.required,
              Validators.minLength(3),
            ])
          );
        }

        this.controlsReady = true;
 
      }
    });
  }

  shippingMethodSignal = signal<GetShippingMethodDetailType>(null);
  controlsReady: boolean = false;
  frm: FormGroup;

  onSubmit() {
    if (this.frm.valid) {
      const ContentForKeyValue = this.translateService
        .getLangs()
        .map((locale) => ({
          key: locale,
          value: this.frm.controls[`content${locale}`].value,
        }))
        .reduce((acc, item) => {
          acc[item.key] = item.value;
          return acc;
        }, {});

      this.httpClient
        .put<ResultResponseType<null>, UpdateShippingMethodType>(
          { controller: 'ShippingMethod', action: 'UdpateShippingMethod' },
          {
            id: this.shippingMethodSignal().id,
            content: ContentForKeyValue,
            price: this.frm.controls['price']?.value,
            disCountPrice: this.frm.controls['disCountPrice']?.value,
          }
        )
        .subscribe({
          next: (response) => {
            if (response?.isSuccess) {
              this.router.navigate(['/dashboard/shippingmethods/1']);
            }
          },
        });
    } else {
      const errorMessages: { key: string; value: string }[] = [];

      for (const key of Object.keys(this.frm.controls)) {
        const controlErrors: ValidationErrors = this.frm.controls[key]?.errors;

        if (controlErrors) {
          const validationKey = Object.keys(controlErrors).toString();

          if (!errorMessages.some((x) => x.key === validationKey)) {
            let errorMessage = '';

            errorMessage = this.translateService.instant(
              `VALIDATION.ShippingMethodCRUD.${validationKey + key}`
            );

            errorMessages.push({
              key: validationKey,
              value: errorMessage,
            });
          }
        }
      }

      const formErrors = this.frm.errors;
      if (formErrors) {
        if (formErrors['unsupportedLangs']) {
          const langs = formErrors['unsupportedLangs'].join(', ');
          errorMessages.push({
            key: 'unsupportedLangs',
            value: this.translateService.instant(
              'VALIDATION.UnsupportedLangs',
              {
                langs,
              }
            ),
          });
        }

        if (formErrors['missingLangs']) {
          const langs = formErrors['missingLangs'].join(', ');
          errorMessages.push({
            key: 'missingLangs',
            value: this.translateService.instant('VALIDATION.MissingLangs', {
              langs,
            }),
          });
        }
      }

      if (errorMessages.length > 0) {
        this.toastr.message(
          errorMessages
            .reduce((acc, message) => {
              acc.push(message?.value);
              return acc;
            }, [])
            .join('\n'),
          'Info',
          {
            messageType: ToastrMessageType.Info,
            position: ToastrPosition.BottomRight,
          }
        );
      }
    }
  }

  numberCheck(event: Event) {
    const input = event.target as HTMLInputElement;
    const value = Number.parseInt(input?.value);
    if (isNaN(value) || value < 0) {
      input.value = '';
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
        (locale) => !controls[`content${locale}`]?.value?.trim()
      );

      if (missingLangKeys.length > 0) {
        return { missingLangs: missingLangKeys };
      }
      return null;
    };
  }
}
