import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { RouterLink } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';

import { AuthService } from '../../../../services/common/auth.service';
import {
  CustomToastrService,
  ToastrMessageType,
  ToastrPosition,
} from '../../../../services/ui/custom-toastr.service';
import RegisterType from '../../../../models/responseType/authResponseType/RegisterType';

@Component({
  selector: 'app-register',
  imports: [RouterLink, ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent {
  constructor(
    private formBuilder: FormBuilder,
    public translate: TranslateService,
    private toastr: CustomToastrService,
    private authService: AuthService
  ) {
    this.frm = formBuilder.group(
      {
        firstName: ['', [Validators.required, Validators.min(1)]],
        lastName: ['', [Validators.required, Validators.min(1)]],
        userName: ['', [Validators.required, Validators.min(1)]],
        email: ['', [Validators.required, Validators.min(1), Validators.email]],
        phoneNumber: [
          '',
          [
            Validators.required,
            Validators.pattern('^((\\+994-?)|0)?[0-9]{10}$'),
          ],
        ],
        password: [
          '',
          [
            Validators.required,
            Validators.pattern(
              '^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[!@#$%^&*()_+\\-={}\\[\\]:;"\'<>,.?/~`]).{6,}$'
            ),
          ],
        ],
        confirmPassword: ['', [Validators.required]],
        adress: ['', [Validators.required]],
      },
      { validators: this.passwordMatchValidator }
    );
  }
  passwordMatchValidator(form: FormGroup) {
    const password = form.get('password')?.value;
    const confirmPassword = form.get('confirmPassword')?.value;
    return password === confirmPassword ? null : { mismatch: true };
  }
  frm: FormGroup;
  passwordForm: FormGroup;
  onSubmitForm(): void {
   
    if (this.frm.valid) {
      const data: RegisterType = {
        firstname: this.frm.controls['firstName'].value,
        lastname: this.frm.controls['lastName'].value,
        username: this.frm.controls['userName'].value,
        email: this.frm.controls['email'].value,
        phoneNumber: this.frm.controls['phoneNumber'].value,
        password: this.frm.controls['password'].value,
        confirmPassword: this.frm.controls['confirmPassword'].value,
        adress: this.frm.controls['adress'].value,
      };
      this.authService.register(data);
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
              errorMessages.push(this.translate.instant(translationKey));
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
