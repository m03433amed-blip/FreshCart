import { Component, inject, OnInit, signal } from '@angular/core';
import { CategoriesService } from '../../../../core/services/categories.service';
import { Category } from '../../../../core/models/category.interface';
import { RouterLink } from "@angular/router";

@Component({
  selector: 'app-home-category',
  imports: [RouterLink],
  templateUrl: './home-category.component.html',
  styleUrl: './home-category.component.css',
})
export class HomeCategoryComponent implements OnInit{
  private readonly categoriesService = inject(CategoriesService)

  categoryList = signal<Category[]>([])

  ngOnInit(): void {
    this.getAllcategory()
  }

  getAllcategory():void {
    this.categoriesService.getAllCategories().subscribe({
      next:(res)=>{
       this.categoryList.set(res.data)
      },
      error:(err)=>{
        console.log(err);
      }
    })
  }
}
