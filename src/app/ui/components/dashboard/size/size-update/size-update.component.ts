import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import {
  CustomToastrService,
  ToastrMessageType,
  ToastrPosition,
} from '../../../../../services/ui/custom-toastr.service';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { HttpClientService } from '../../../../../services/common/http-client.service';
import GetSizeType from '../../../../../models/DTOs/SizeDTOs/GetSizeType';
import ResultResponseType from '../../../../../models/responseType/ResultResponseType';
import { NgIf } from '@angular/common';
import UpdateSizeType from '../../../../../models/DTOs/SizeDTOs/UpdateSizeType';
@Component({
  selector: 'app-size-update',
  imports: [NgIf, ReactiveFormsModule],
  templateUrl: './size-update.component.html',
  styleUrl: './size-update.component.css',
})
export class SizeUpdateComponent {
  constructor(
    private activatedRoute: ActivatedRoute,
    public translateService: TranslateService,
    private formBuilder: FormBuilder,
    private toastr: CustomToastrService,
    private httpClient: HttpClientService,
    private router: Router
  ) {
    const paramId = this.activatedRoute.snapshot.params['Id'];
    this.sizeId = paramId;
    this.frm = this.formBuilder.group({});
    this.httpClient
      .get<ResultResponseType<GetSizeType>>({
        controller: 'Size',
        action: 'GetSizeById',
        queryString: `id=${this.sizeId}`,
      })
      .subscribe({
        next: (response) => {
          if (response?.isSuccess) {
            this.frm.addControl(
              'size',
              this.formBuilder.control(response.data.size, [
                Validators.required,
                Validators.minLength(1),
              ])
            );
            this.controlsReady = true;
          }
        },
      });
  }

  sizeId: string;
  controlsReady: boolean = false;
  frm: FormGroup;
  onSubmit() {

    if (this.frm.valid) {
      let bodyData: UpdateSizeType = {
        id: this.sizeId,
        size: this.frm.controls['size'].value,
      };

      this.httpClient
        .put<ResultResponseType<null>, UpdateSizeType>(
          { controller: 'Size', action: 'UpdateSize' },
          bodyData
        )
        .subscribe({
          next: (response) => {
            if (response?.isSuccess) {
              this.router.navigate(['/dashboard/sizes/1']);
            }
          },
        });
    } else {
      const errorMessages: string[] = [];

      const fieldValidationKeys: {
        [key: string]: { [errorKey: string]: string };
      } = {
        size: {
          required: 'VALIDATION.SizeCrud.SizeContentRequired',
          minLength: 'VALIDATION.SizeCrud.SizeContentMinLength',
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
}
