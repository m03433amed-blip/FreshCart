import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl, ɵInternalFormsSharedModule, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink } from "@angular/router";
import { AuthService } from '../../core/auth/services/auth.service';

@Component({
  selector: 'app-login',
  imports: [RouterLink, ɵInternalFormsSharedModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  private readonly fb = inject(FormBuilder)
  private readonly authService = inject(AuthService)
  private readonly router = inject(Router)
  loginForm: FormGroup = this.fb.group({
  email: ['', [Validators.required, Validators.email]],
  password: ['', [Validators.required, Validators.pattern(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/)]],

}, 
{ 
  updateOn: 'change' 
});


  submitForm():void {
   if(this.loginForm.valid){
      this.authService.signIn(this.loginForm.value).subscribe({
        next:(res)=> {
      
          
          if (res.message === 'success'){

            localStorage.setItem('freshToken' , res.token)
            localStorage.setItem('freshUser' , JSON.stringify(res.user))
            this.authService.isLogged.set(true)
            this.router.navigate(['/'])
          }
          
        }
      })
   }
   else {
    this.loginForm.markAllAsTouched()
   }
  }

}
