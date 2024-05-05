import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})
export class ProductApiService {

  readonly productAPIUrl = "http://localhost:8001/api"; 
  constructor(private http:HttpClient) { }

  // Product
  getProductList():Observable<any[]> {
    return this.http.get<any>(this.productAPIUrl + '/Product/getProducts');
  }

  addProduct(data:any) {
    return this.http.post(this.productAPIUrl + '/Product/insertProducts', data)
  }

  updateProduct(data:any) {
    console.log(data);
    return this.http.put(this.productAPIUrl + `/Product/updateProduct`, data)
  }

  deleteProduct(id:number|string) {
    console.log(id);
    return this.http.delete(this.productAPIUrl + `/Product/deleteProduct/${id}`)
  }

  // Category
  getCategoryList():Observable<any[]> {
    return this.http.get<any>(this.productAPIUrl + '/Category/getCategories');
  }
}
