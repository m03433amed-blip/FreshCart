import { Component, inject, OnInit, PLATFORM_ID, signal } from '@angular/core';
import { ProductService } from '../../../../core/services/product.service';
import { Product } from '../../../../core/models/product.interface';
import { RouterLink } from "@angular/router";
import { CartService } from '../../../../core/services/cart.service';
import { ToastrService } from 'ngx-toastr';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-home-products',
  imports: [RouterLink],
  templateUrl: './home-products.component.html',
  styleUrl: './home-products.component.css',
})
export class HomeProductsComponent implements OnInit{
  private readonly productService = inject(ProductService)
  private readonly toastrService = inject(ToastrService)
  private readonly pLATFORM_ID = inject(PLATFORM_ID)
  private readonly cartService = inject(CartService)
  productList = signal<Product[]>([])
  ngOnInit(){
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
         this.toastrService.success(res.message , 'FreshCart' , {timeOut:1500 , progressBar:true})
         this.cartService.cartCount.set(res.numOfCartItems)
      }
    })
   }
   else {
    this.toastrService.warning("Login First " , 'FreshCart' , {progressBar:true , timeOut:1500 })
   }
  }
  }
}
