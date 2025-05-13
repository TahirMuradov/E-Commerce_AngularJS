import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [RouterLink,ReactiveFormsModule],
  standalone:true,
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {

  constructor(private formBuilder:FormBuilder) {
 this.frm=formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
 })
  }
  frm:FormGroup
  ngOnInit(): void {
    this.frm.controls['email'].setValue('muradovtahir01@gmail.com')
console.log(this.frm.controls)
  }
  onSubmitForm(): void {
    if (this.frm.valid) {
      console.log("Email:", this.frm.controls['email'].value);
      console.log("Password:", this.frm.controls['password'].value);
    } else {
      let errorMessages: string[] = [];

      if (this.frm.controls['email'].errors) {
        if (this.frm.controls['email'].errors['required']) {
          errorMessages.push('Email is required.');
        }
        if (this.frm.controls['email'].errors['email']) {
          errorMessages.push('Email format is invalid.');
        }
      }

      if (this.frm.controls['password'].errors) {
        if (this.frm.controls['password'].errors['required']) {
          errorMessages.push('Password is required.');
        }
      }

      alert('Form contains errors:\n' + errorMessages.join('\n'));
    }
  }

}
