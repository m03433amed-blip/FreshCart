import { register } from 'swiper/element/bundle';
import { Component, inject } from '@angular/core';
import { Router, RouterLink } from "@angular/router";
import { AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import { log } from 'console';
import { AuthService } from '../../core/auth/services/auth.service';

@Component({
  selector: 'app-register',
  imports: [RouterLink ,ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent {
  private readonly fb = inject(FormBuilder)
  private readonly authService = inject(AuthService)
  private readonly router = inject(Router)
registerForm: FormGroup = this.fb.group({
  name: ['', [Validators.required, Validators.minLength(3)]],
  email: ['', [Validators.required, Validators.email]],
  password: ['', [Validators.required, Validators.pattern(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/)]],
  rePassword: ['', [Validators.required]],
  phone: ['', [Validators.required, Validators.pattern(/^01[0125][0-9]{8}$/)]],
}, 
{ 
  validators: [this.confirmPassword.bind(this)], 
  updateOn: 'change' 
});


  submitForm():void {
   if(this.registerForm.valid){
      this.authService.signUp(this.registerForm.value).subscribe({
        next:(res)=> {
      
          
          if (res.message === 'success'){
            this.router.navigate(['/login'])
          }
          
        }
      })
   }
   else {
    this.registerForm.markAllAsTouched()
   }
  }

  confirmPassword (group : AbstractControl){
    const password = group.get('password')?.value
    const repassword = group.get('rePassword')?.value
    if (repassword !== password && repassword !== "") {
      group.get('rePassword')?.setErrors({mismatch:true})
      return {mismatch:true}
    }
    return null
  }
}
