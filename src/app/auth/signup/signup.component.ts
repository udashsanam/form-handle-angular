import { Component } from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";

@Component({
  selector: 'app-signup',
  standalone: true,
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css',
  imports: [
    ReactiveFormsModule
  ]
})
export class SignupComponent {
  form = new FormGroup({
    email : new FormControl('', {
      validators: [Validators.email, Validators.required]
    }),
    password: new FormControl('', {
      validators: [Validators.required, Validators.min(6)]
    })
  })

  onSubmit() {
    console.log(this.form);
    console.log(this.form.controls.email.value);
    console.log(this.form.controls.password.value)
  }
  get passwordIsInvalid(){
    return (this.form.controls.password.invalid && this.form.controls.password.dirty
    && this.form.controls.password.touched);
  }
}
