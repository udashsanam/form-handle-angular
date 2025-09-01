import { Component } from '@angular/core';
import {AbstractControl, FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {of} from "rxjs";
function mustContainQuestionMark(control: AbstractControl){
  if ( control.value.includes('?') ){
    return null;
  }
  return {
    doesNotContainQuestionMark: true
  }
}

function emailIsUnique(control: AbstractControl){
  if(control.value !='test@example.com'){
    return of(null);
  }
  return of({
    notUnique: true
  });
}

@Component({
  selector: 'app-login',
  standalone: true,
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
  imports: [
    ReactiveFormsModule
  ]
})
export class LoginComponent {
  form = new FormGroup({
    email: new FormControl('', {
      validators: [Validators.email, Validators.required],
      asyncValidators: [emailIsUnique],
    }),
    password: new FormControl('', {
      validators: [Validators.required, Validators.min(6), mustContainQuestionMark],
    })
  });

  onSubmit() {
    console.log(this.form);
    console.log(this.form.controls.email.value);
    console.log(this.form.controls.password.value)
  }

  get emailIsInvalid(){
    return (
      this.form.controls.email.invalid &&
      this.form.controls.email.touched &&
      this.form.controls.email.dirty
    )
  }

  get passwordIsInvalid(){
    return (
      this.form.controls.password.invalid &&
      this.form.controls.password.touched &&
      this.form.controls.password.dirty
    )
  }

}
