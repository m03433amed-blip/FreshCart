import { Component } from '@angular/core';
import { SliderComponent } from './components/slider/slider.component';
import { DecSliderComponent } from "./components/dec-slider/dec-slider.component";
import { HomeCategoryComponent } from './components/home-category/home-category.component';
import { HomeOffersComponent } from './components/home-offers/home-offers.component'; 
import { HomeProductsComponent } from './components/home-products/home-products.component';
import { HomeContactComponent } from './components/home-contact/home-contact.component'; 
import { HomeFootComponent } from './components/home-foot/home-foot.component'; 

@Component({
  selector: 'app-home',
  imports: [SliderComponent, DecSliderComponent, HomeCategoryComponent, HomeOffersComponent, HomeProductsComponent, HomeContactComponent, HomeFootComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {}
