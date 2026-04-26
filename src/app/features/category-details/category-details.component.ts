import { Component, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute, RouterLink } from "@angular/router";
import { SubcategoriesService } from '../../core/services/subcategories.service';
import { sign } from 'crypto';
import { Subcategory } from '../../core/models/product.interface';
import { CategoriesService } from '../../core/services/categories.service';
import { Category } from '../../core/models/category.interface';

@Component({
  selector: 'app-category-details',
  imports: [RouterLink],
  templateUrl: './category-details.component.html',
  styleUrl: './category-details.component.css',
})
export class CategoryDetailsComponent implements OnInit{
  private readonly subcategoriesService = inject(SubcategoriesService)
  private readonly categoriesService = inject(CategoriesService)
  private readonly activatedRoute = inject(ActivatedRoute)
  category = signal<Category>({} as Category)

  subCategoreList = signal<Subcategory[]>([])
  ngOnInit(): void {
   
    this.activatedRoute.paramMap.subscribe((params)=>{
      this.getSpecficCategory(params.get('id') !)
       this.getAllSubcategories(params.get('id') !)
    })
  }
  getAllSubcategories(id:string):void {
    this.subcategoriesService.getAllSubcategories(id).subscribe({
      next:(res)=>{
        this.subCategoreList.set(res.data) 
      },
      error:(err)=>{
        console.log(err);
        
      }
    })
  }
  getSpecficCategory(id:string):void {
    this.categoriesService.getSpecficCategory(id).subscribe({
      next:(res)=>{
        this.category.set(res.data)        
      },
      error:(err)=>{
        console.log(err);
        
      }
    })
  }
}
