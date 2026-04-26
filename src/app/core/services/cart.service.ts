import { Product } from './../models/product.interface';
import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private readonly httpClient = inject(HttpClient)


  cartCount = signal<number>(0)

  addProductToCart(productId:string):Observable<any> {
    return this.httpClient.post(environment.baseUrl + `/api/v2/cart` , {
  "productId": productId
})
  }
  loggedUserCart():Observable<any> {
    return this.httpClient.get(environment.baseUrl + `/api/v2/cart`)
  }
  removeProductFromCart(id:string):Observable<any> {
    return this.httpClient.delete(environment.baseUrl + `/api/v2/cart/${id}`)
  }
  updateCartCountQuantity(id:string,count:number):Observable<any> {
    return this.httpClient.put(environment.baseUrl + `/api/v2/cart/${id}` , {
  "count": count
})
  }
  clearUserCart():Observable<any> {
    return this.httpClient.delete(environment.baseUrl + `/api/v2/cart`)
  }
  createCashOrder(carttID:string , data:object):Observable<any> {
    return this.httpClient.post(environment.baseUrl+ `/api/v1/orders/${carttID}` , data)
  }
  createVisaOrder(carttID:string , data:object):Observable<any> {
    return this.httpClient.post(environment.baseUrl+ `/api/v1/orders/checkout-session/${carttID}?url=http://localhost:4200` , data)
  }
}
