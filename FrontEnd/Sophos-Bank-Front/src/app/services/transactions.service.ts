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

  public deposit(productNumber:number,value :number,modifiedBy:string){
    return this.httpClient.put(`${baseUrl}/v0/transactions/deposit/${modifiedBy}/${productNumber}/${value}`,null)
  }

  public withdraw(productNumber:number,value :number,modifiedBy:string){
    return this.httpClient.put(`${baseUrl}/v0/transactions/withdraw/${modifiedBy}/${productNumber}/${value}`,null)
  }

  public overdraft(productNumber:number,value :number,modifiedBy:string){
    return this.httpClient.put(`${baseUrl}/v0/products/overdraft/${modifiedBy}/${productNumber}/${value}`,null)
  }

  public transfer(productFrom:number,productTo:number,value :number,modifiedBy:string){
    return this.httpClient.put(`${baseUrl}/v0/transactions/transfer/${modifiedBy}/${productFrom}/${productTo}/${value}`,null)
  }

  public payDebt(productFrom:number,productTo:number,value :number,modifiedBy:string){
    return this.httpClient.put(`${baseUrl}/v0/transactions/paydebt/${modifiedBy}/${productFrom}/${productTo}/${value}`,null)
  }






}
