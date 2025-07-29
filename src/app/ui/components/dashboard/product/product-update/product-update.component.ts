import {
  Component,
  effect,
  ElementRef,
  signal,
  ViewChild,
} from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import {
  CustomToastrService,
  ToastrMessageType,
  ToastrPosition,
} from '../../../../../services/ui/custom-toastr.service';
import { HttpClientService } from '../../../../../services/common/http-client.service';
import GetCategoryForSelect from '../../../../../models/DTOs/CategoryDTOs/GetCategoryForSelect';
import GetSizeType from '../../../../../models/DTOs/SizeDTOs/GetSizeType';
import ResultResponseType from '../../../../../models/responseType/ResultResponseType';
import { NgFor, NgIf } from '@angular/common';
import GetProductForUpdateType from '../../../../../models/DTOs/ProductDTOs/GetProductForUpdateType';
import { ImageComponent } from '../../image/image.component';

@Component({
  selector: 'app-product-update',
  imports: [NgIf, NgFor, TranslateModule, ReactiveFormsModule, ImageComponent],
  templateUrl: './product-update.component.html',
  styleUrl: './product-update.component.css',
})
export class ProductUpdateComponent {
  constructor(
    private activatedRoute: ActivatedRoute,
    public translateService: TranslateService,
    private formBuilder: FormBuilder,
    private toastr: CustomToastrService,
    private httpClient: HttpClientService,
    private router: Router
  ) {
    const paramId = this.activatedRoute.snapshot.params['Id'];

    this.httpClient
      .get<ResultResponseType<GetProductForUpdateType>>({
        controller: 'Product',
        action: 'GetProductByIdForUpdate',
        queryString: `id=${paramId}`,
      })
      .subscribe({
        next: (response: ResultResponseType<GetProductForUpdateType>) => {
          if (response?.isSuccess) {
            this.productSignal.set(response.data);
            this.oldPicturePathSignal.set(response.data.imageUrls);
          }
        },
      });

    this.httpClient
      .get<ResultResponseType<GetSizeType[]>>({
        controller: 'Size',
        action: 'GetAllSizes',
      })
      .subscribe({
        next: (response: ResultResponseType<GetSizeType[]>) => {
          if (response?.isSuccess) {
            this.sizesSignal.set(response.data);
          }
        },
      });
    this.httpClient
      .get<ResultResponseType<GetCategoryForSelect[]>>({
        controller: 'Category',
        action: 'GetAllCategoryForSelect',
      })
      .subscribe({
        next: (response: ResultResponseType<GetCategoryForSelect[]>) => {
          if (response?.isSuccess) {
            this.categorySignal.set(response.data);
          }
        },
      });
    effect(() => {
      const sizeSignal = this.sizesSignal();
      const categorySignal = this.categorySignal();
      const productSignal = this.productSignal();

      if (sizeSignal && categorySignal && productSignal) {
        if (!(this.oldPicturePathSignal()&&this.oldPicturePathSignal().length==0)) {
          
          this.oldPicturePathSignal.set(productSignal.imageUrls);
        }
        this.frm = formBuilder.group(
          {
            categoryId: [productSignal?.categoryId, [Validators.required]],
            pictures: [
              ,
              [
                
                this.imageFileValidator(['jpg', 'jpeg', 'png', 'gif']),
              ],
            ],
            productCode: [productSignal.productCode, [Validators.required]],
            discountPrice: [productSignal.discount, [Validators.min(0)]],
            price: [productSignal.price, [Validators.min(1)]],
            isFeature: [productSignal.isFeature],
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
            `title${locale}`,
            this.formBuilder.control(productSignal.title[locale] ?? '', [
              Validators.required,
              Validators.minLength(3),
            ])
          );
          this.frm.addControl(
            `description${locale}`,
            this.formBuilder.control(productSignal.description[locale] ?? '', [
              Validators.required,
              Validators.minLength(3),
            ])
          );
        }

        for (const size of sizeSignal) {
          let checkSize = productSignal.sizes?.filter((x) => x.id == size.id);

          if (checkSize) {
            this.frm.addControl(
              size.id,
              this.formBuilder.control(checkSize[0].stockCount, [
                Validators.min(0),
              ])
            );
          } else {
            this.frm.addControl(
              size.id,
              this.formBuilder.control(0, [Validators.min(0)])
            );
          }
        }

        this.controlsReady = true;
      }
    });
  }
  @ViewChild('fileInput') fileInput!: ElementRef<HTMLInputElement>;
  sizesSignal = signal<GetSizeType[] | null>(null);
  categorySignal = signal<GetCategoryForSelect[] | null>(null);
  productSignal = signal<GetProductForUpdateType | null>(null);
  newPictureSignal = signal<File[]>([]);
  oldPicturePathSignal = signal<string[]>([]);
  deletedOldPicturePathSignal = signal<string[]>([]);
  price = signal<number | null>(null);
  disCount = signal<number | null>(null);
  controlsReady: boolean = false;

  frm: FormGroup;
  onSubmit() {
    if (this.frm.valid) {
      const formData = new FormData();
      const TitleDataForKeyValue = this.translateService
        .getLangs()
        .map((locale) => ({
          key: locale,
          value: this.frm.controls[`title${locale}`]?.value,
        }))
        .reduce((acc, item) => {
          acc[item.key] = item?.value;
          return acc;
        }, {});
      const DescriptionDataForKeyValue = this.translateService
        .getLangs()
        .map((locale) => ({
          key: locale,
          value: this.frm.controls[`description${locale}`]?.value,
        }))
        .reduce((acc, item) => {
          acc[item.key] = item?.value;
          return acc;
        }, {});
      const SizeDataForKeyValue = this.sizesSignal()
        .map((size) => ({
          key: size.id,
          value: this.frm.controls[`${size.id}`]?.value,
        }))
        .reduce((acc, item) => {
          acc[item.key] = item?.value;
          return acc;
        }, {});
        formData.append("id",this.productSignal().id)
      formData.append('categoryId', this.frm.controls['categoryId']?.value);
      formData.append(
        'Description',
        JSON.stringify(DescriptionDataForKeyValue)
      );
      formData.append('Title', JSON.stringify(TitleDataForKeyValue));
      formData.append('Sizes', JSON.stringify(SizeDataForKeyValue));
      formData.append('discount', this.frm.controls['discountPrice']?.value);
      formData.append('price', this.frm.controls['price']?.value);
      formData.append('productCode', this.frm.controls['productCode']?.value);
      formData.append('Isfeature', this.frm.controls['isFeature']?.value);
for (const picture of this.newPictureSignal()) {
  formData.append('NewImages', picture);
}
     for (const picture of this.deletedOldPicturePathSignal()) {
  formData.append('DeletedImageUrls', picture);
}

      this.httpClient
        .put<ResultResponseType<null>, FormData>(
          { controller: 'Product', action: 'UpdateProduct' },
          formData
        )
        .subscribe({
          next: (response) => {
            if (response?.isSuccess) {
              this.router.navigate(['/dashboard/products/1']);
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
              `VALIDATION.ProductCrud.${validationKey + key}`
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
  supportedLangsValidator(supportedLangs: string[]): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const controls = control['controls'];
      const invalidLangKeys = Object.keys(controls)
        .filter(
          (key) => key.startsWith('title') || key.startsWith('description')
        )
        .map((key) => key.replace(/^title|^description/, ''))
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
          !controls[`title${locale}`]?.value?.trim() ||
          !controls[`description${locale}`]?.value?.trim()
      );

      if (missingLangKeys.length > 0) {
        return { missingLangs: missingLangKeys };
      }
      return null;
    };
  }
  imageFileValidator(allowedTypes: string[]): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      const files = control?.value as FileList;

      if (!files || files.length === 0) {
        return null;
      }

      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        if (!file.name || file.name.split('.').length < 2) {
          return { invalidFileType: true };
        }

        const extension = file.name.split('.').pop()?.toLowerCase();
        if (!extension || !allowedTypes.includes(extension)) {
          return { invalidFileType: true };
        }
      }

      return null;
    };
  }
  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.frm.patchValue({
        pictures: input.files,
      });
      this.frm.get('pictures')?.updateValueAndValidity();
      this.newPictureSignal.set(Array.from(input.files));
    }
  }
  numberCheck(event: Event) {
    const input = event.target as HTMLInputElement;
    const value = Number.parseInt(input?.value);
    if (isNaN(value) || value < 0) {
      this.price.set(null);
      input.value = '';
    }
  }
  deletePhoto(photoUrl: string, isNew: boolean, photoName: string) {
    if (isNew) {
      const updatedPhotos = this.newPictureSignal().filter(
        (file) => file.name !== photoName
      );
      this.newPictureSignal.set(updatedPhotos);
      this.frm.patchValue({
        pictures: updatedPhotos,
      });
      this.frm.get('pictures')?.updateValueAndValidity();

      const dataTransfer = new DataTransfer();
      this.newPictureSignal().forEach((file) => {
        dataTransfer.items.add(file);
      });
      if (this.fileInput.nativeElement) {
        this.fileInput.nativeElement.files = dataTransfer.files;
      }
      URL.revokeObjectURL(photoUrl);
    } else {
      const isOldPhoto = this.oldPicturePathSignal().includes(photoUrl);
      if (isOldPhoto) {
  if (isOldPhoto) {
  const deletedPhotos = this.deletedOldPicturePathSignal();
  this.deletedOldPicturePathSignal.set([...deletedPhotos, photoUrl]);

  const updatedOldPhotos = this.oldPicturePathSignal().filter(x => x !== photoUrl);
  this.oldPicturePathSignal.set(updatedOldPhotos);
          const currentProduct = this.productSignal();
      if (currentProduct) {
        const updatedProduct = {
          ...currentProduct,
          imageUrls: currentProduct.imageUrls.filter((url) => url !== photoUrl),
        };
        this.productSignal.set(updatedProduct);
      }
}}
    }
  }
}
