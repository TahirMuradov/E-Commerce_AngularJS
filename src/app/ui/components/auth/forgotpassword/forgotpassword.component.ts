import { Component, OnInit, ViewChild } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-forgotpassword',
  imports: [RouterLink,FormsModule],
  standalone:true,
  templateUrl: './forgotpassword.component.html',
  styleUrl: './forgotpassword.component.css'
})
export class ForgotpasswordComponent implements OnInit {
  //template-driven Forms
  @ViewChild("frm",{static:true})frm:NgForm
  ngOnInit(): void {
console.log(this.frm)
console.log(this.frm.form)
console.log(this.frm.valid)
console.log(this.frm.value)
console.log(this.frm.touched)
console.log(this.frm.submitted)
console.log(this.frm.controls)
  }
onSubmitForm(data:{email:string}){
console.log(data.email)
}
}
