import { Component } from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule} from "@angular/forms";

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
    email: new FormControl(''),
    password: new FormControl('')
  });

  onSubmit() {
    console.log(this.form);
    console.log(this.form.controls.email.value);
    console.log(this.form.controls.password.value)
  }

}
