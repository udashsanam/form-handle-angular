import {afterNextRender, afterRender, Component, DestroyRef, inject, signal, viewChild} from '@angular/core';
import {FormsModule, NgForm} from "@angular/forms";
import {debounce, debounceTime} from "rxjs";

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
  private form  = viewChild.required<NgForm>('form');
  destroyRef = inject(DestroyRef);
  constructor() {
    afterNextRender(() => {
      const savedForm = window.localStorage.getItem('user-email');
      if(savedForm){
        const loadedFormDate = JSON.parse(savedForm);
        const savedEmail = loadedFormDate.email;

        setTimeout(()=> this.form().controls['email'].setValue(savedEmail), 1 );
      }
      const  subscription = this.form().valueChanges?.pipe(debounceTime(500)).subscribe({
        next: (value) => {

          window.localStorage.setItem('user-email',JSON.stringify({
            'email': value.email
          }))

        }
      })
      this.destroyRef.onDestroy(() => subscription?.unsubscribe());

    });
  }
  onsubmit(formData: NgForm) {
    if(formData.form.invalid){
      return;
    }

    console.log(formData.form.value.email);
    console.log(formData.form.value.password);
    console.log(formData.form);
    formData.form.reset();

  }
}
