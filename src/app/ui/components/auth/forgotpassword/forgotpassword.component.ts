import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
    NgModel,
    ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { RouterLink } from '@angular/router';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../../../../services/common/auth.service';


@Component({
  selector: 'app-forgotpassword',
  imports: [RouterLink, ReactiveFormsModule,TranslateModule],
  standalone: true,
  templateUrl: './forgotpassword.component.html',
  styleUrl: './forgotpassword.component.css',
})
export class ForgotpasswordComponent {
  constructor(
    private formBuilder: FormBuilder,
    public translate: TranslateService,
    private toastr: ToastrService,
    private authService: AuthService,

  ) {
    this.frm = formBuilder.group({
      email:['', [Validators.required]],
    });
  }
  frm: FormGroup;
  onSubmitForm(): void {
    console.log(this.frm.controls['email'].value)
    if (this.frm.valid) {
      this.authService.forgotPassword(this.frm.controls['email'].value);
    } else {
      let errorMessages: string[] = [];

      if (this.frm.controls['email'].errors) {
        if (this.frm.controls['email'].errors['required']) {
          errorMessages.push(
            this.translate.instant('VALIDATION.EmailRequired')
          );
        }
        if (this.frm.controls['email'].errors['email']) {
          errorMessages.push(this.translate.instant('VALIDATION.EmailType'));
        }
      }

      this.toastr.error(errorMessages.join('\n'), 'Error');
    }
  }
}
