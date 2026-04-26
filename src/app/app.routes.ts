import { Routes } from '@angular/router';
import { authGuard } from './core/auth/guards/auth-guard';

export const routes: Routes = [
    {path:'', loadComponent:()=>import('./features/home/home.component').then((c)=>c.HomeComponent) , title:'Home page'},
    {path:'brands', loadComponent:()=>import('./features/brands/brands.component').then((c)=>c.BrandsComponent) , title:'Brands'},
    {path:'brands/:id', loadComponent:()=>import('./features/brand-details/brand-details.component').then((c)=>c.BrandDetailsComponent), title:'Brands Details'},
    {path:'cart' ,loadComponent:()=>import('./features/cart/cart.component').then((c)=>c.CartComponent), title : 'cart' , canActivate:[authGuard]},
    {path:'categories', loadComponent:()=>import('./features/categories/categories.component').then((c)=>c.CategoriesComponent) , title:'categories'},
    {path:'categories/:id', loadComponent:()=>import('./features/category-details/category-details.component').then((c)=>c.CategoryDetailsComponent), title:'category details'},
    {path:'subcategories/:id', loadComponent:()=>import('./features/subcategori-details/subcategori-details.component').then((c)=>c.SubcategoriDetailsComponent), title:'subCategory details'},
    {path:'checkout/:id' , loadComponent:()=>import('./features/checkout/checkout.component').then((c)=>c.CheckoutComponent) , title:'checkout' , canActivate:[authGuard]},
    {path:'details/:id/:slug',loadComponent:()=>import('./features/details/details.component').then((c)=>c.DetailsComponent),title:'Details'},
    {path:'forget' , loadComponent:()=>import('./features/forget/forget.component').then((c)=>c.ForgetComponent),title:'Forget Page'},
    {path:'login' , loadComponent:()=>import('./features/login/login.component').then((c)=>c.LoginComponent) , title:'Login Page'},
    {path:'allorders' ,loadComponent:()=>import('./features/orders/orders.component').then((c)=>c.OrdersComponent), title:'orders Page', canActivate:[authGuard]},
    {path:'register' , loadComponent:()=>import('./features/register/register.component').then((c)=>c.RegisterComponent) , title:'register Page'},
    {path:'shop' ,loadComponent:()=>import('./features/shop/shop.component').then((c)=>c.ShopComponent) , title:'shop Page'},
    {path:'whishlist' ,loadComponent:()=>import('./features/wishlist/wishlist.component').then((c)=>c.WishlistComponent) , title:'whishList Page' , canActivate:[authGuard]},
    {path:'electronics' ,loadComponent:()=>import('./features/electronics/electronics.component').then((c)=>c.ElectronicsComponent) , title:'electronics Page'},
    {path:'**' , loadComponent:()=>import('./features/notfound/notfound.component').then((c)=>c.NotfoundComponent) , title:'Not found Page'},

];
