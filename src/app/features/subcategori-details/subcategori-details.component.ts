import { Component, inject, OnInit, PLATFORM_ID, signal } from '@angular/core';
import { SubcategoriesService } from '../../core/services/subcategories.service';
import { Product } from '../../core/models/product.interface';
import { ActivatedRoute, RouterLink } from "@angular/router";
import { HomeFootComponent } from "../home/components/home-foot/home-foot.component";
import { SubcatName } from '../../core/models/subcat-name.interface';
import { isPlatformBrowser } from '@angular/common';
import { CartService } from '../../core/services/cart.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-subcategori-details',
  imports: [RouterLink, HomeFootComponent],
  templateUrl: './subcategori-details.component.html',
  styleUrl: './subcategori-details.component.css',
})
export class SubcategoriDetailsComponent implements OnInit{
  private readonly subcategoriesService = inject(SubcategoriesService)
  private readonly cartService = inject(CartService)
  private readonly toastrService = inject(ToastrService)
  private readonly activatedRoute = inject(ActivatedRoute)
  private readonly pLATFORM_ID = inject(PLATFORM_ID)
  filterProduct = signal<Product[]>([])
  categoryNameDec = signal<SubcatName>({} as SubcatName)

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe((params)=>{
     this.getSpecficProductsFilter( params.get('id') !)
     this.categoryName(params.get('id') !)
    })
  }
  getSpecficProductsFilter (id:string):void  {
    this.subcategoriesService.getFilterOfProducts(id).subscribe({
      next:(res)=>{
        this.filterProduct.set(res.data)        
      },
      error:(err)=>{
        console.log(err);
        
      }
    })
  }
  categoryName(id:string):void {
   this.subcategoriesService.getSpecfiicSubcategory(id).subscribe({
    next:(res)=>{
        console.log(res );
      this.categoryNameDec.set(res.data)   
    
       
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
