import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import baseUrl from './helper';

@Injectable({
  providedIn: 'root'
})
export class TransactionsService {

  constructor(private httpClient: HttpClient) { }


  public productTransactionHistory(productNumber:any){
    return this.httpClient.get(`${baseUrl}/v0/transactions/history/${productNumber}`)
  }






}
