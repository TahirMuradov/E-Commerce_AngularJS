import { Component, effect, signal } from '@angular/core';
import { NgFor, NgIf } from '@angular/common';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
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
import { HttpClientService } from '../../../../../services/common/http-client.service';
import { Router } from '@angular/router';
import ResultResponseType from '../../../../../models/responseType/ResultResponseType';
import GetSizeType from '../../../../../models/DTOs/SizeDTOs/GetSizeType';
import GetCategoryForSelect from '../../../../../models/DTOs/CategoryDTOs/GetCategoryForSelect';
import AddProductType from '../../../../../models/DTOs/ProductDTOs/AddProductType';
import { HttpHeaders } from '@angular/common/http';
@Component({
  selector: 'app-product-create',
  imports: [NgIf, NgFor, TranslateModule, ReactiveFormsModule],
  templateUrl: './product-create.component.html',
  styleUrl: './product-create.component.css',
  standalone: true,
})
export class ProductCreateComponent {
  constructor(
    public translateService: TranslateService,
    private formBuilder: FormBuilder,
    private toastr: CustomToastrService,
    private httpClient: HttpClientService,
    private router: Router
  ) {
    this.frm = formBuilder.group(
      {
        categoryId: ['', [Validators.required]],
        pictures: [
          ,
          [
            Validators.required,
            this.imageFileValidator(['jpg', 'jpeg', 'png', 'gif']),
          ],
        ],
        productCode:['',[Validators.required]],
      discountPrice:[0,[Validators.min(0)]],
      price:[0,[Validators.min(1)]],
 isFeature:[true]
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
        this.formBuilder.control('', [
          Validators.required,
          Validators.minLength(3),
        ])
      );
      this.frm.addControl(
        `description${locale}`,
        this.formBuilder.control('', [
          Validators.required,
          Validators.minLength(3),
        ])
      );
    }

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
      if (sizeSignal && categorySignal) {
     
        for (const size of sizeSignal) {
          this.frm.addControl(
            size.id,
            this.formBuilder.control(0, [Validators.min(0)])
          );
        }

        this.controlsReady = true;
      }
    });
  }
  sizesSignal = signal<GetSizeType[] | null>(null);
  categorySignal = signal<GetCategoryForSelect[] | null>(null);
  price = signal<number | null>(null);
  disCount = signal<number | null>(null);
  controlsReady: boolean = false;
  frm: FormGroup;
onClickIsFeatured(){
   console.log( this.frm.controls['isFeature']?.value)
}
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
      formData.append('ProductImages', files[i]);
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
console.log(validationKey+key)
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
      .filter((key) => key.startsWith('title') || key.startsWith('description'))
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
  updatePrice(event: Event) {
    const input = event.target as HTMLInputElement;
    const value = Number.parseFloat(input?.value);

    if (isNaN(value) || value <0) {
      this.price.set(null);
      input.value = '';
    } else {
      this.price.set(value);
    }
  }
  updateDisCountPrice(event: Event) {
    const input = event.target as HTMLInputElement;
    const value = Number.parseFloat(input?.value);

    if (isNaN(value) || value < 0) {
      this.price.set(null);
      input.value = '';
    } else {
      this.disCount.set(value);
    }
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
      pictures: input.files
    });
    this.frm.get('pictures')?.updateValueAndValidity();
  }
}
numberCheck(event:Event){
  const input = event.target as HTMLInputElement;
      const value = Number.parseInt(input?.value);
    if (isNaN(value) || value < 0) {
      this.price.set(null);
      input.value = '';
    }
}
}
