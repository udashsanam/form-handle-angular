import {Component, DestroyRef, inject, OnInit} from '@angular/core';
import {AbstractControl, FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {debounceTime, of} from "rxjs";
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
export class LoginComponent implements OnInit{

  dsstryRef = inject(DestroyRef);

  form = new FormGroup({
    email: new FormControl('', {
      validators: [Validators.email, Validators.required],
      asyncValidators: [emailIsUnique],
    }),
    password: new FormControl('', {
      validators: [Validators.required, Validators.min(6), mustContainQuestionMark],
    })
  });

  ngOnInit(): void {
    const formValue = window.localStorage.getItem('login-form');
    if(formValue){
      const value = JSON.parse(formValue);
      this.form.controls.email.setValue(value.email);
    }
    const subscription = this.form.valueChanges.pipe(debounceTime(500)).subscribe({
      next: value => {
        window.localStorage.setItem('login-form', JSON.stringify({
          'email':value
        }))
      }
    })
    this.dsstryRef.onDestroy(() => {
      subscription.unsubscribe();
    })
  }

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
