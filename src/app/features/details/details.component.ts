import { log } from 'console';
import { Component, inject, OnInit, PLATFORM_ID, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../../core/services/product.service';
import { Product } from '../../core/models/product.interface';
import { isPlatformBrowser } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
import { CartService } from '../../core/services/cart.service';

@Component({
  selector: 'app-details',
  imports: [],
  templateUrl: './details.component.html',
  styleUrl: './details.component.css',
})
export class DetailsComponent implements OnInit {
  private readonly activatedRoute = inject(ActivatedRoute)
  private readonly productService = inject(ProductService)
    private readonly toastrService = inject(ToastrService)
      private readonly cartService = inject(CartService)
  private readonly pLATFORM_ID = inject(PLATFORM_ID)
  
  productDetails = signal<Product>({} as Product)

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe((params)=> {
      this.getProductAllDetails(params.get('id') !)
    })
  }

  getProductAllDetails (id:string):void{
    this.productService.getSpecficProduct(id).subscribe({
      next:(res)=>{
        this.productDetails.set(res.data)
        
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
