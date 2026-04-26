import { Component, inject, OnInit, PLATFORM_ID, signal } from '@angular/core';
import { ProductService } from '../../core/services/product.service';
import { Product } from '../../core/models/product.interface';
import { RouterLink } from "@angular/router";
import { isPlatformBrowser } from '@angular/common';
import { CartService } from '../../core/services/cart.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-shop',
  imports: [RouterLink],
  templateUrl: './shop.component.html',
  styleUrl: './shop.component.css',
})
export class ShopComponent implements OnInit{
  private readonly productService = inject(ProductService)
    private readonly toastrService = inject(ToastrService)
    private readonly pLATFORM_ID = inject(PLATFORM_ID)
  private readonly cartService = inject(CartService)

   productList = signal<Product[]>([])

   ngOnInit(): void {
     this.getAllProducts()
   }
    getAllProducts():void{
    this.productService.getAllProducts().subscribe({
      next:(res)=>{
        this.productList.set(res.data)
        
      },
      error:(err)=>{
        console.log(err);
        
      }
    })
  }
    addProductToCart(id:string):void{
  if(isPlatformBrowser(this.pLATFORM_ID)) {
     if(localStorage.getItem('freshToken')){
     this.cartService.addProductToCart(id).subscribe({
      next:(res)=>{
     this.cartService.cartCount.set(res.numOfCartItems)

    this.toastrService.success(res.message , 'FreshCart' , {timeOut:1500 , progressBar:true})
        
      }
    })
   }
   else {
    this.toastrService.warning("Login First " , 'FreshCart' , {progressBar:true , timeOut:1500 })
   }
  }
  }
}
