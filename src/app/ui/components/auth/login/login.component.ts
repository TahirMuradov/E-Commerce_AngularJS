import { Component, OnInit } from '@angular/core';
import {CommonModule} from '@angular/common'
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { RouterLink } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../../../../services/common/auth.service';

@Component({
  selector: 'app-login',
  imports: [RouterLink, ReactiveFormsModule,CommonModule],
  standalone: true,
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent implements OnInit {
  constructor(
    private formBuilder: FormBuilder,
    public translate: TranslateService,
    private toastr: ToastrService,
    private authService: AuthService
  ) {
    this.frm = formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }
  frm: FormGroup;
  ngOnInit(): void {
    this.frm.controls['email'].setValue('muradovtahir01@gmail.com');
    console.log(this.frm.controls);
    console.log(  this.authService.identityCheck());
  }
  onSubmitForm(): void {
    if (this.frm.valid) {

this.authService.signIn(
  this.frm.controls["email"].value,
  this.frm.controls["password"].value
)
      console.log('Email:', this.frm.controls['email'].value);
      console.log('Password:', this.frm.controls['password'].value);
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

      if (this.frm.controls['password'].errors) {
        if (this.frm.controls['password'].errors['required']) {
          errorMessages.push(
            this.translate.instant('VALIDATION.RequiredPassword')
          );
        }
      }

          this.toastr.error((errorMessages.join('\n')), 'Error');
    }
  }
}
