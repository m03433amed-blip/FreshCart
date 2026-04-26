import { Component, inject, OnInit, signal } from '@angular/core';
import { BrandsService } from '../../core/services/brands.service';
import { Brand } from '../../core/models/product.interface';
import { RouterLink } from "@angular/router";

@Component({
  selector: 'app-brands',
  imports: [RouterLink],
  templateUrl: './brands.component.html',
  styleUrl: './brands.component.css',
})
export class BrandsComponent implements OnInit {
  private readonly brandsService = inject(BrandsService)
  brandList = signal<Brand[]>([])

  ngOnInit(): void {
    this.getBrands()
  }

  getBrands ():void {
    this.brandsService.getAllBrands().subscribe({
      next:(res)=>{
        this.brandList.set(res.data)
        
      }
    })
  }
}
