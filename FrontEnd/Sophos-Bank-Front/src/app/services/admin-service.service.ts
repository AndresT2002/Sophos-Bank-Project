import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import baseUrl from './helper';

@Injectable({
  providedIn: 'root'
})
export class AdminServiceService {

  constructor(private httpClient: HttpClient) { }

  

  public listClients(){
    return this.httpClient.get(`${baseUrl}/v0/clients/getclients`)
  }
  public deleteClient(cedula:number){
    return this.httpClient.delete(`${baseUrl}/v0/clients/delete/${cedula}`)
    }
}
