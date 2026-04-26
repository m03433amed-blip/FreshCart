import { Component, inject, OnInit, PLATFORM_ID, signal } from '@angular/core';
import { CartService } from '../../core/services/cart.service';
import { Cart } from '../../core/models/cart.interface';
import { RouterLink } from "@angular/router";
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-cart',
  imports: [RouterLink],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css',
})
export class CartComponent implements OnInit{
  private readonly cartService = inject(CartService)
  private readonly pLATFORM_ID = inject(PLATFORM_ID)
  cartDetailsObject = signal<Cart> ({} as Cart)


  ngOnInit(): void {
if (isPlatformBrowser(this.pLATFORM_ID)) {
    this.cartDetails();
  }
    
  }
  cartDetails():void{
    this.cartService.loggedUserCart().subscribe({
      next:(res)=>{
        console.log(res.data);
        
        this.cartDetailsObject.set(res.data)
      }
    })
  }
  removItem(id :string) {
    this.cartService.removeProductFromCart(id).subscribe({
      next:(res)=>{
       this.cartDetailsObject.set(res.data)
       this.cartService.cartCount.set(res.numOfCartItems)

      }
    })
  }
  updateCount(id:string , count:number):void{
    this.cartService.updateCartCountQuantity(id,count).subscribe({
      next:(res)=>{
        this.cartDetailsObject.set(res.data)
      }
    })
  }
  removeAllItem():void {
    this.cartService.clearUserCart().subscribe({
      next:(res)=>{
        this.cartDetailsObject.set(res.data)
        this.cartService.cartCount.set(res.numOfCartItems)

      }
    })
  }
}
