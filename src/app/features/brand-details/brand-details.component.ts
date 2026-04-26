import { BrandDetail } from './../../core/models/brand-detail.interface';
import { Component, inject, OnInit, PLATFORM_ID, signal } from '@angular/core';
import { ActivatedRoute, RouterLink } from "@angular/router";
import { ProductService } from '../../core/services/product.service';
import { BrandsService } from '../../core/services/brands.service';
import { isPlatformBrowser } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
import { CartService } from '../../core/services/cart.service';
import { Brand } from '../../core/models/product.interface';

@Component({
  selector: 'app-brand-details',
  imports: [RouterLink],
  templateUrl: './brand-details.component.html',
  styleUrl: './brand-details.component.css',
})
export class BrandDetailsComponent implements OnInit{
  private readonly brandsService = inject(BrandsService)
  private readonly activatedRoute = inject(ActivatedRoute)
  private readonly toastrService = inject(ToastrService)
  private readonly pLATFORM_ID = inject(PLATFORM_ID)
  private readonly cartService = inject(CartService)
  BrandDetailList = signal<BrandDetail[]>([])
  specficBrand = signal<Brand>({} as Brand)

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe((params)=>{
      this.getProductsBrand(params.get('id')!)
      this.getSpecficBrand(params.get('id')!)
    })
  }
  getProductsBrand(id:string):void{
    this.brandsService.FilterProductBrand(id).subscribe({
      next:(res)=>{
       this.BrandDetailList.set(res.data)
     
        
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
  getSpecficBrand(id:string):void {
    this.brandsService.getSpecficBrand(id).subscribe({
      next:(res)=>{

        this.specficBrand.set(res.data)
      }
    })
  }

}
