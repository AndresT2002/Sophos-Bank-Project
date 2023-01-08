import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import baseUrl from './helper';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(private httpClient: HttpClient) { }


  public listClientProducts(clientId:number){
    return this.httpClient.get(`${baseUrl}/v0/products/clientid/${clientId}`)
  }

  public activateProduct(productId:number){
    return this.httpClient.put(`${baseUrl}/v0/products/activate/${productId}`,null)
  }

  public desactivateProduct(productId:number){
    return this.httpClient.put(`${baseUrl}/v0/products/desactivate/${productId}`,null)
  }

  
  public activateGmf(productId:number){
    return this.httpClient.put(`${baseUrl}/v0/products/activate/${productId}/gmf`,null)
  }

  public desactivateGmf(productId:number){
    return this.httpClient.put(`${baseUrl}/v0/products/desactivate/${productId}/gmf`,null)
  }

  public cancelProduct(productNumber:number){
    return this.httpClient.put(`${baseUrl}/v0/products/cancel/${productNumber}`,null)
  }

  public createProduct(product:any){
    return this.httpClient.post(`${baseUrl}/v0/products/create`,product)
  }
  public listAllProducts(){
    return this.httpClient.get(`${baseUrl}/v0/products`)
  }


    
}
