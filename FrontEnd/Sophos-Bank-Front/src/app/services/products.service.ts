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

  public activateProduct(productId:number,modifiedBy:string){
    return this.httpClient.put(`${baseUrl}/v0/products/activate/${modifiedBy}/${productId}`,null)
  }

  public desactivateProduct(productId:number,modifiedBy:string){
    return this.httpClient.put(`${baseUrl}/v0/products/desactivate/${modifiedBy}/${productId}`,null)
  }

  
  public activateGmf(productId:number,modifiedBy:string){
    return this.httpClient.put(`${baseUrl}/v0/products/activate/${modifiedBy}/${productId}/gmf`,null)
  }

  public desactivateGmf(productId:number,modifiedBy:string){
    return this.httpClient.put(`${baseUrl}/v0/products/desactivate/${modifiedBy}/${productId}/gmf`,null)
  }

  public cancelProduct(productNumber:number,modifiedBy:string){
    return this.httpClient.put(`${baseUrl}/v0/products/cancel/${modifiedBy}/${productNumber}`,null)
  }

  public createProduct(product:any){
    return this.httpClient.post(`${baseUrl}/v0/products/create`,product)
  }
  public listAllProducts(){
    return this.httpClient.get(`${baseUrl}/v0/products`)
  }


    
}
