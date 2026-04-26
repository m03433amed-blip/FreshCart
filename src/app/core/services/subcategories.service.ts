import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class SubcategoriesService {
  private readonly httpClient = inject(HttpClient)

  getAllSubcategories(id:string):Observable<any>{
    return this.httpClient.get(environment.baseUrl + `/api/v1/categories/${id}/subcategories`)
  }
  getFilterOfProducts(id:string):Observable<any> {
    return this.httpClient.get(environment.baseUrl + `/api/v1/products?subcategory=${id}`)
  }
  getSpecfiicSubcategory(id:string):Observable<any>{
    return this.httpClient.get(environment.baseUrl +`/api/v1/subcategories/${id}`)
  }
}
