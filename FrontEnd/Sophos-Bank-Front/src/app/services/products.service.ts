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
}
