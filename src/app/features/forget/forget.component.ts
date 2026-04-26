import { Component, inject, signal } from '@angular/core';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { sign } from 'crypto';
import { AuthService } from '../../core/auth/services/auth.service';
import { log } from 'console';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forget',
  imports: [ReactiveFormsModule],
  templateUrl: './forget.component.html',
  styleUrl: './forget.component.css',
})
export class ForgetComponent {
  private readonly authService = inject(AuthService)
  private readonly router = inject(Router)
  step = signal<number>(1)
  stage = signal<string>('envelope')

  email : FormControl = new FormControl ('' , [Validators.required])
  code : FormControl = new FormControl ('' , [Validators.required])
  password : FormControl = new FormControl ('' , [Validators.required])

  emailSubmit(e:Event):void{
    e.preventDefault()
    if(this.email.valid) {
      const data = {
        email : this.email.value
      }
      this.authService.forgotPassword(data).subscribe({
        next:(res)=> {
          if(res.statusMsg === 'success') {
            this.step.set(2)
            this.stage.set('key')
          }
          
        }
      })

    }
  }
  codeSubmit(e:Event):void{
    e.preventDefault()
    if(this.code.valid) {
       const data = {
        resetCode : this.code.value
      }
       this.authService.verifyResetCode(data).subscribe({
        next:(res)=> {
          if(res.status === 'Success') {
            this.step.set(3)
            this.stage.set('lock')
          }
          
        }
      })
    }
  }
  passwordSubmit(e:Event):void{
    e.preventDefault()
    if(this.password.valid) {
       const data = {
        email : this.email.value ,
        newPassword : this.password.value
      }
         this.authService.resetPassword(data).subscribe({
        next:(res)=> {
          if(res.token) {
            this.step.set(1)
            this.stage.set('envelope')
            this.router.navigate(['/login'])
          }
          
        }
      })
    }
  }
}