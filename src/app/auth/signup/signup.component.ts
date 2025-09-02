import { Component } from '@angular/core';
import {AbstractControl, FormArray, FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
function  equalValue(control: AbstractControl){
  const password = control.get('password')?.value;
  const confirmPassword = control.get('confirmPassword')?.value;

  if(password == confirmPassword){
    return null;
  }
  return {notEqual: true};
}

function  abstractEqualValue(controlName1: string, controlName2: string){
  return (control: AbstractControl) => {
    const control1 = control.get(controlName1);
    const control2 = control.get(controlName2);
    if(control1?.value == control2?.value){
      return null;
    }
    return {notEqual: true};
  };
}
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
    passwords: new FormGroup({
      password: new FormControl('', {
        validators: [Validators.required, Validators.min(6)]
      }),
      confirmPassword : new FormControl('', {
        validators: [Validators.required, Validators.min(6)]
      })
    }, {
      validators: [equalValue, abstractEqualValue('password', 'confirmPassword')]
    }),
    firstName: new FormControl('', {
      validators: [Validators.required]
    }),
    lastName: new FormControl('', {
      validators: [Validators.required]
    }),
    address: new FormGroup({
      street: new FormControl('', {
        validators: [Validators.required]
      }),
      number: new FormControl('', {
        validators: [Validators.required]
      }),
      postalCode: new FormControl('', {
        validators: [Validators.required]
      }),
      city: new FormControl('', {
        validators: [Validators.required]
      }),
    }),
    role: new FormControl<'student' | 'teacher' |'employee' | 'founder' | 'other'>('student',{
      validators: [Validators.required]
    }),
    source: new FormArray([
      new FormControl(false),
      new FormControl(true),
      new FormControl(false)
    ]),
    agree: new FormControl(false,{
      validators: [Validators.required]
    })
  })

  onSubmit() {

    if(this.form.invalid){
      console.log("INVALID FORM");
      return;
    }
  }


  onReset() {
    this.form.reset();
  }
}
