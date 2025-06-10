import { Component, effect, ElementRef, signal, ViewChild } from '@angular/core';
import { ImageComponent } from '../../image/image.component';
import {  AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import {NgIf,NgFor} from "@angular/common"
import { HttpClientService } from '../../../../../services/common/http-client.service';
import { CustomToastrService, ToastrMessageType, ToastrPosition } from '../../../../../services/ui/custom-toastr.service';
import { ActivatedRoute, Router } from '@angular/router';
import GetForUpdateHomeSliderItemType from '../../../../../models/DTOs/WebUIDTOs/HomeSliderItem/GetForUpdateHomeSliderItemType';
import ResultResponseType from '../../../../../models/responseType/ResultResponseType';

@Component({
  selector: 'app-home-slider-item-update',
  imports: [NgIf, NgFor, TranslateModule, ReactiveFormsModule, ImageComponent],
  templateUrl: './home-slider-item-update.component.html',
  styleUrl: './home-slider-item-update.component.css'
})
export class HomeSliderItemUpdateComponent {
  constructor(
    private activatedRoute: ActivatedRoute,
    public translateService: TranslateService,
    private formBuilder: FormBuilder,
    private toastr: CustomToastrService,
    private httpClient: HttpClientService,
    private router: Router
  ){
    const paramId = this.activatedRoute.snapshot.params['id'];
        this.httpClient
          .get<ResultResponseType<GetForUpdateHomeSliderItemType>>({
            controller: 'HomeSliderItem',
            action: 'GetHomeSliderItemForUpdate',
            queryString: `id=${paramId}`,
          })
          .subscribe({
            next: (response: ResultResponseType<GetForUpdateHomeSliderItemType>) => {
              if (response?.isSuccess) {
                this.homeSliderItemSignal.set(response.data);
            
                this.oldPicturePathSignal.set([response.data.imageUrl]);
              }
            },
          });

              effect(() => {

      const homeSliderItemSignal = this.homeSliderItemSignal();

      if (homeSliderItemSignal) {
      
        this.frm = formBuilder.group(
          {
      
            pictures: [
              ,
              [
                
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
            this.formBuilder.control(homeSliderItemSignal.title[locale] ?? '', [
              Validators.required,
              Validators.minLength(3),
            ])
          );
          this.frm.addControl(
            `description${locale}`,
            this.formBuilder.control(homeSliderItemSignal.description[locale] ?? '', [
              Validators.required,
              Validators.minLength(3),
            ])
          );
        }

  

        this.controlsReady = true;
      }
    });
  }
    @ViewChild('fileInput') fileInput!: ElementRef<HTMLInputElement>;
 

 homeSliderItemSignal = signal<GetForUpdateHomeSliderItemType | null>(null);
  newPictureSignal = signal<File[]>([]);
  oldPicturePathSignal = signal<string[]>(null);
  deletedOldPicturePathSignal = signal<string[]>([]);
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
  
        formData.append("id",this.homeSliderItemSignal().id)
 
      formData.append(
        'Description',
        JSON.stringify(DescriptionDataForKeyValue)
      );
      formData.append('Title', JSON.stringify(TitleDataForKeyValue));
    
for (const picture of this.newPictureSignal()) {
  formData.append('NewImage', picture);
}


      this.httpClient
        .put<ResultResponseType<null>, FormData>(
          { controller: 'HomeSliderItem', action: 'UpdateHomeSliderItem' },
          formData
        )
        .subscribe({
          next: (response) => {
            if (response?.isSuccess) {
              this.router.navigate(['/dashboard/homeslideritems/1']);
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
