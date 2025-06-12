import { Component, effect, ElementRef, signal, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClientService } from '../../../../../services/common/http-client.service';
import { CustomToastrService, ToastrMessageType, ToastrPosition } from '../../../../../services/ui/custom-toastr.service';
import { AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import{NgIf,NgFor} from"@angular/common"
import { ImageComponent } from '../../image/image.component';
import GetCategoryForSelect from '../../../../../models/DTOs/CategoryDTOs/GetCategoryForSelect';
import ResultResponseType from '../../../../../models/responseType/ResultResponseType';
import PaginatedListType from '../../../../../models/responseType/PaginatedListType';
import GetTopCategoryAreaType from '../../../../../models/DTOs/WebUIDTOs/TopCategoryAreaDTOs/GetTopCategoryAreaType';
import GetForUpdateTopCategoryAreaType from '../../../../../models/DTOs/WebUIDTOs/TopCategoryAreaDTOs/GetForUpdateTopCategoryAreaType';

@Component({
  selector: 'app-top-category-area-update',
  imports: [NgIf, NgFor, TranslateModule, ReactiveFormsModule, ImageComponent],
  standalone:true,
  templateUrl: './top-category-area-update.component.html',
  styleUrl: './top-category-area-update.component.css'
})
export class TopCategoryAreaUpdateComponent {
constructor(    public translateService: TranslateService,
    private formBuilder: FormBuilder,
    private toastr: CustomToastrService,
    private httpClient: HttpClientService,
        private activatedRoute: ActivatedRoute,
    private router: Router){
        const paramId = this.activatedRoute.snapshot.params['id'];

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
 this.httpClient.get<ResultResponseType<GetForUpdateTopCategoryAreaType>>({controller:"TopCategoryArea",action:"GetTopCategoryAreaForUpdate",queryString:`id=${paramId}`})
 .subscribe({
  next:(response:ResultResponseType<GetForUpdateTopCategoryAreaType>)=>{
if (response?.isSuccess) {
  this.topCategoryAreaSignal.set(response.data)
this.oldPicturePathSignal.set([response.data.pictureUrl])
}
  }
 })
          effect(()=>{

            const topCategoryAreaSignal=this.topCategoryAreaSignal()
         const categoryAreaSignal=this.categorySignal()
         if (topCategoryAreaSignal&&categoryAreaSignal){
    this.frm = formBuilder.group(
      {  categoryId: ['', [Validators.required]],
            pictures: [[],
          [
            Validators.required,
            this.imageFileValidator(['jpg', 'jpeg', 'png', 'gif']),
          ],
        ],
  
  
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
        this.formBuilder.control(this.topCategoryAreaSignal().title[locale], [
          Validators.required,
          Validators.minLength(3),
        ])
      );
      this.frm.addControl(
        `description${locale}`,
        this.formBuilder.control(this.topCategoryAreaSignal().description[locale], [
          Validators.required,
          Validators.minLength(3),
        ])
      );
    }
  this.controlsReady = true;
  }

})
    }
      newPictureSignal=signal<File[]>([])
   oldPicturePathSignal = signal<string[]>(null);
  deletedOldPicturePathSignal = signal<string[]>([]);
      topCategoryAreaSignal=signal<GetForUpdateTopCategoryAreaType>(null)
    categorySignal = signal<GetCategoryForSelect[] | null>(null);
    controlsReady: boolean = false;
  frm: FormGroup;
   @ViewChild('fileInput') fileInput!: ElementRef<HTMLInputElement>;



   
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

        formData.append('id',this.topCategoryAreaSignal().id)
    formData.append('Title', JSON.stringify(TitleDataForKeyValue));
    formData.append('Description', JSON.stringify(DescriptionDataForKeyValue));
    formData.append("categoryId", this.frm.controls['categoryId']?.value)
    formData.append('Image',this.frm.get('pictures')?.value[0]);

  
      
    
        this.httpClient
          .post<ResultResponseType<null>, FormData>(
            { controller: 'TopCategoryArea', action: 'UpdateTopCategoryArea',
            },
            formData,
          )
          .subscribe({
            next: (response) => {
              if (response?.isSuccess) {
                this.router.navigate(['/dashboard/topcategoryareas/1']);
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
  
          errorMessage = this.translateService.instant(`VALIDATION.TopCategoryAreaCrud.${validationKey+key}`);
  
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
}}
    }
  }
}
