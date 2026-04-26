import { Component, inject, OnInit, signal } from '@angular/core';
import { CategoriesService } from '../../core/services/categories.service';
import { sign } from 'crypto';
import { Category } from '../../core/models/category.interface';
import { RouterLink } from "@angular/router";

@Component({
  selector: 'app-categories',
  imports: [RouterLink],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.css',
})
export class CategoriesComponent implements OnInit{
  private readonly categoriesService = inject(CategoriesService)

  ListOfCategories = signal<Category[]>([])

ngOnInit(): void {
  this.getAllcategories()
}

getAllcategories():void{
  this.categoriesService.getAllCategories().subscribe({
    next:(res)=>{
      this.ListOfCategories.set(res.data)
      
    },
    error:(err)=>{
      console.log(err);
      
    }
  })
}
}
