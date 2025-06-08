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
import UpdateProductType from '../../../../../models/DTOs/ProductDTOs/UpdateProductType';
import { NgFor, NgIf } from '@angular/common';
import GetProductForUpdateType from '../../../../../models/DTOs/ProductDTOs/GetProductForUpdateType';

@Component({
  selector: 'app-product-update',
  imports: [NgIf, NgFor, TranslateModule, ReactiveFormsModule],
  templateUrl: './product-update.component.html',
  styleUrl: './product-update.component.css',
})
export class ProductUpdateComponent {
  constructor(
    private activatedRoute:ActivatedRoute,
    public translateService: TranslateService,
    private formBuilder: FormBuilder,
    private toastr: CustomToastrService,
    private httpClient: HttpClientService,
    private router: Router
  ) {
    const paramId = this.activatedRoute.snapshot.params['Id'];
this.httpClient.get<ResultResponseType<GetProductForUpdateType>>({controller:"Product",action:"GetProductByIdForUpdate",queryString:`id=${paramId}`})
.subscribe({
  next:(response:ResultResponseType<GetProductForUpdateType>)=>{
if (response?.isSuccess) {
  this.productSignal.set(response)
}
  }
})

    effect(() => {
      const sizeSignal = this.sizesSignal();
      const categorySignal = this.categorySignal();
      if (sizeSignal && categorySignal&& this.productSignal()) {
        const productData=this.productSignal()?.data
         this.frm = formBuilder.group(
      {
        categoryId: [productData.categoryId, [Validators.required]],
        pictures: [
          ,
          [
            Validators.required,
            this.imageFileValidator(['jpg', 'jpeg', 'png', 'gif']),
          ],
        ],
        productCode:[productData.productCode,[Validators.required]],
      discountPrice:[productData.discount,[Validators.min(0)]],
      price:[productData.price,[Validators.min(1)]],
 isFeature:[productData.isFeature]
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
        this.formBuilder.control(productData.title[locale], [
          Validators.required,
          Validators.minLength(3),
        ])
      );
      this.frm.addControl(
        `description${locale}`,
        this.formBuilder.control(productData.description[locale], [
          Validators.required,
          Validators.minLength(3),
        ])
      );
    }
        for (const size of sizeSignal) {
let checkSize=productData.sizes.filter(x=>x.id==size.id)[0]

          if (checkSize) {
            
            this.frm.addControl(
              size.id,
              this.formBuilder.control(checkSize.stockCount, [Validators.min(0)])
            );
          }else{
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
  productSignal=signal<ResultResponseType<GetProductForUpdateType>|null>(null);
  sizesSignal = signal<GetSizeType[] | null>(null);
  categorySignal = signal<GetCategoryForSelect[] | null>(null);
  price = signal<number | null>(null);
  disCount = signal<number | null>(null);
  deletedImageUrlsSignal=signal<string[]>([]);
  controlsReady: boolean = false;
  paramsId:string;
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
        key:size.id ,
        value: this.frm.controls[`${size.id}`]?.value,
      }))
      .reduce((acc, item) => {
        acc[item.key] = item?.value;
        return acc;
      }, {});
formData.append("categoryId", this.frm.controls['categoryId']?.value)
  formData.append('Description', JSON.stringify(DescriptionDataForKeyValue));
  formData.append('Title', JSON.stringify(TitleDataForKeyValue));
  formData.append('Sizes', JSON.stringify(SizeDataForKeyValue));
  formData.append("discount",this.frm.controls['discountPrice']?.value)
  formData.append("price",this.frm.controls['price']?.value)
  formData.append( 'productCode', this.frm.controls['productCode']?.value,)
  formData.append('Isfeature', this.frm.controls['isFeature']?.value,)
  const files = this.frm.get('pictures')?.value as FileList;
  if (files) {
    for (let i = 0; i < files.length; i++) {
      formData.append('NewImages', files[i]);
    }
  }
  if (this.deletedImageUrlsSignal()) {
    for (const url of this.deletedImageUrlsSignal()) {
  
      formData.append("DeletedImageUrls",url)
    }
  }
      this.httpClient
        .post<ResultResponseType<null>, FormData>(
          { controller: 'Product', action: 'AddProduct',
          },
          formData,
        )
        .subscribe({
          next: (response) => {
            if (response?.isSuccess) {
              this.router.navigate(['/dashboard/products/1']);
            }
          },
        });
    } else {
      const errorMessages: {key:string,value:string}[] = [];

      for (const key of Object.keys(this.frm.controls)) {
        const controlErrors: ValidationErrors = this.frm.controls[key]?.errors;
      
        if (controlErrors) {
        const validationKey=  Object.keys(controlErrors).toString()
         
          if (!errorMessages.some(x => x.key === validationKey)) {

       let errorMessage = '';

        errorMessage = this.translateService.instant(`VALIDATION.ProductCrud.${validationKey+key}`);

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
  updatePrice(event: Event) {
    const input = event.target as HTMLInputElement;
    const value = Number.parseFloat(input.value);

    if (isNaN(value) || value < 1) {
      this.price.set(null);
      input.value = '';
    } else {
      this.price.set(value);
    }
  }
  updateDisCountPrice(event: Event) {
    const input = event.target as HTMLInputElement;
    const value = Number.parseFloat(input.value);

    if (isNaN(value) || value < 1) {
      this.price.set(null);
      input.value = '';
    } else {
      this.disCount.set(value);
    }
  }
  imageFileValidator(allowedTypes: string[]): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      const file = control.value;
      if (file) {
        const extension = file.name.split('.').pop()?.toLowerCase();
        if (!allowedTypes.includes(extension)) {
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

}
