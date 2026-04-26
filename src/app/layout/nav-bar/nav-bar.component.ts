import { FlowbiteService } from './../../core/services/flowbite.service';
import { Component, computed, inject, PLATFORM_ID } from '@angular/core';
import { RouterLink, RouterLinkActive } from "@angular/router";
import { initFlowbite } from 'flowbite';
import { AuthService } from '../../core/auth/services/auth.service';
import { isPlatformBrowser } from '@angular/common';
import { CartService } from '../../core/services/cart.service';

@Component({
  selector: 'app-nav-bar',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.css',
})
export class NavBarComponent {
    constructor(private FlowbiteService: FlowbiteService) {}
    private readonly authService = inject(AuthService)
    private readonly pLATFORM_ID = inject(PLATFORM_ID) 
    private readonly cartService = inject(CartService) 
    logged = computed(()=>this.authService.isLogged())


    count = computed(()=>this.cartService.cartCount())
  ngOnInit(): void {
    if (isPlatformBrowser(this.pLATFORM_ID)) {
      this.getCartCount()
      if (localStorage.getItem('freshToken')) {
        this.authService.isLogged.set(true)
        
      }
      
    }
    this.FlowbiteService.loadFlowbite((FlowbiteService) => {
      initFlowbite();
    });
    
  }

  logOutNav():void{
    this.authService.signOut()
  }
  getCartCount():void {
    this.cartService.loggedUserCart().subscribe({
      next:(res)=>{
        this.cartService.cartCount.set(res.numOfCartItems)
      }
    })
  }
}
