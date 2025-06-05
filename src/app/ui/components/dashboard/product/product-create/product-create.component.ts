import { Component, effect, signal } from '@angular/core';
import { NgFor, NgIf } from '@angular/common'
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ReactiveFormsModule, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { CustomToastrService, ToastrMessageType, ToastrPosition } from '../../../../../services/ui/custom-toastr.service';
import { HttpClientService } from '../../../../../services/common/http-client.service';
import { Router } from '@angular/router';
import ResultResponseType from '../../../../../models/responseType/ResultResponseType';
import GetSizeType from '../../../../../models/DTOs/SizeDTOs/GetSizeType';
import GetCategoryForSelect from '../../../../../models/DTOs/CategoryDTOs/GetCategoryForSelect';
import AddProductType from '../../../../../models/DTOs/ProductDTOs/AddProductType';
@Component({
  selector: 'app-product-create',
  imports: [NgIf, NgFor, TranslateModule, ReactiveFormsModule],
  templateUrl: './product-create.component.html',
  styleUrl: './product-create.component.css',
  standalone:true
})
export class ProductCreateComponent {

constructor(
  public translateService: TranslateService,
    private formBuilder: FormBuilder,
    private toastr: CustomToastrService,
    private httpClient: HttpClientService,
    private router: Router) {
    this.frm = formBuilder.group(
      {
        categoryId: ['', [Validators.required]],
        pictures:['',[Validators.required]]
      },
      {
        validators: this.supportedLangsValidator(
          this.translateService.getLangs()
        ),
        validaors: this.requiredLangsValidator(
          this.translateService.getLangs()
        ),
      }
    );
     this.frm.addControl('isFeatured', this.formBuilder.control(false));
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
 
this.httpClient.get<ResultResponseType<GetSizeType[]>>({controller:"Size",action:"GetAllSizes"})
.subscribe(
  {
    next:(response:ResultResponseType<GetSizeType[]>)=>{
if (response?.isSuccess) {
  this.sizesSignal.set(response.data)

}
    }
  }
)
this.httpClient.get<ResultResponseType<GetCategoryForSelect[]>>({controller:"Category",action:"GetAllCategoryForSelect"})
.subscribe({
  next:(response:ResultResponseType<GetCategoryForSelect[]>)=>{
if (response?.isSuccess) {
  this.categorySignal.set(response.data)
}
  }
})
effect(()=>{
  const sizeSignal=this.sizesSignal();
  const categorySignal=this.categorySignal();
  if (sizeSignal&&categorySignal) {
for (const size of sizeSignal) {
  
  this.frm.addControl(
     size.id,
     this.formBuilder.control('', [
           Validators.min(0),
     ])
   );
}


      this.controlsReady = true;
  }
})
  

    }
sizesSignal=signal<GetSizeType[]|null>(null)
categorySignal=signal<GetCategoryForSelect[]|null>(null)
  price = signal<number | null>(null);
  disCount=signal<number|null>(null)
 controlsReady: boolean = false;
  frm: FormGroup;
  
    onSubmit() {
    if (this.frm.valid) {

     const TitleDataForKeyValue = this.translateService
        .getLangs()
        .map((locale) => ({
          key: locale,
          value: this.frm.controls[`title${locale}`].value,
        })).reduce((acc, item) => {
          acc[item.key] = item.value;
          return acc;
        }, {});
const DescriptionDataForKeyValue=this.translateService
        .getLangs()
        .map((locale) => ({
          key: locale,
          value: this.frm.controls[`description${locale}`].value,
        })).reduce((acc, item) => {
          acc[item.key] = item.value;
          return acc;
        }, {})
const SizeDataForKeyValue=this.translateService
        .getLangs()
        .map((locale) => ({
          key: locale,
          value: this.frm.controls[`description${locale}`].value,
        })).reduce((acc, item) => {
          acc[item.key] = item.value;
          return acc;
        }, {})


   let bodyData:AddProductType={
    categoryId:this.frm.controls["categoryId"].value,
    productImages:this.frm.controls["pictures"].value,
    description:DescriptionDataForKeyValue,
    title:SizeDataForKeyValue,
    sizes:SizeDataForKeyValue,
    productCode:this.frm.controls["productcode"].value,
    isFeatured:this.frm.controls["isFeatured"].value

   }
 this.httpClient.post<ResultResponseType<null>,AddProductType>({controller:"Product",action:"AddProduct"},bodyData)
 .subscribe({
  next:(response)=>{
if (response.isSuccess) {
  this.router.navigate(["/dashboard/products/1"])
}
  }
 })


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
}
