import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { AuthService } from '../../../../services/common/auth.service';
import ResultResponseType from '../../../../models/responseType/ResultResponseType';
import { HttpClientService } from '../../../../services/common/http-client.service';
import {
  CustomToastrService,
  ToastrMessageType,
  ToastrPosition,
} from '../../../../services/ui/custom-toastr.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-change-forgot-password',
  imports: [CommonModule,RouterLink, ReactiveFormsModule, TranslateModule],
  standalone: true,
  templateUrl: './change-forgot-password.component.html',
  styleUrl: './change-forgot-password.component.css',
})
export class ChangeForgotPasswordComponent implements OnInit {
  constructor(
    private activatedRoute: ActivatedRoute,
    private formBuilder: FormBuilder,
    public translate: TranslateService,
    private toastr: CustomToastrService,
    private authService: AuthService,
  ) {
    this.frm = formBuilder.group(
      {
        newPassword: [
          '',
          [
            Validators.required,
            Validators.pattern(
              '^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[!@#$%^&*()_+\\-={}\\[\\]:;"\'<>,.?/~`]).{6,}$'
            ),
          ],
        ],
        confirmNewPassword: ['', [Validators.required]],
      },
      { validators: this.passwordMatchValidator }
    );
  }

  frm: FormGroup;
  errorMessages: string[] = [];
  passwordMatchValidator(form: FormGroup) {
    const password = form.get('newPassword')?.value;
    const confirmPassword = form.get('confirmNewPassword')?.value;
    return password === confirmPassword ? null : { mismatch: true };
  }
  email: string;
  token: string;
  tokenValid = false;
  ngOnInit(): void {
this.activatedRoute.queryParamMap.subscribe(params => {
  this.email = params.get('email') || '';
  this.token = params.get('token') || '';

 this.authService.checkTokenForForgotPassword(this.email,this.token).subscribe(result=>this.tokenValid=result)

});
      
  }
  onSubmitForm(): void {
    if (this.frm.valid) {
      this.authService.changeForgotPassword(
      this.email,
        this.token,
        this.frm.controls['newPassword'].value,
        this.frm.controls['confirmNewPassword'].value
      );
    } else {
      let errorMessages: string[] = [];

      if (this.frm.controls['newPassword'].errors) {
        if (this.frm.controls['newPassword'].errors['required']) {
          errorMessages.push(
            this.translate.instant('VALIDATION.RequiredPassword')
          );
        }

        if (this.frm.controls['newPassword'].errors['pattern']) {
          errorMessages.push(
            this.translate.instant('VALIDATION.PasswordPattern')
          );
        }
      }
      if (this.frm.controls['confirmNewPassword']?.errors) {
        if (this.frm.controls['confirmNewPassword']?.errors['required']) {
          errorMessages.push(
            this.translate.instant('VALIDATION.ConfirmPasswordRequired')
          );
        }
      }
      if (this.frm.errors?.['mismatch']) {
        errorMessages.push(
          this.translate.instant('VALIDATION.PasswordMismatch')
        );
      }

      this.toastr.message(errorMessages.join('\n'), this.translate.instant("MessageType.warning"), {
        messageType: ToastrMessageType.Warning,
        position: ToastrPosition.TopLeft,
      });
    }
  }
}
