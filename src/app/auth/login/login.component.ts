import {Component, signal} from '@angular/core';
import {FormsModule, NgForm} from "@angular/forms";

@Component({
  selector: 'app-login',
  standalone: true,
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
  imports: [
    FormsModule
  ]
})
export class LoginComponent {
  isValid = signal(true);
  onsubmit(formData: NgForm) {
    if(formData.form.invalid){
      this.isValid.set(false)
      return;
    }
    this.isValid.set(true);

    console.log(formData.form.value.email);
    console.log(formData.form.value.password);
    console.log(formData.form);

  }
}
