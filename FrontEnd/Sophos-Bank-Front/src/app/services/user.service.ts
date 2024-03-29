import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import baseUrl from './helper';
import { UpdateClient } from '../components/interfaces';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private httpClient: HttpClient) { }

  

  public registerUser(user:any){
  return this.httpClient.post(`${baseUrl}/v0/clients`,user)
  }

  public deleteClient(cedula:number){
    return this.httpClient.delete(`${baseUrl}/v0/clients/delete/${cedula}`)
    }

  public updateClient(user:UpdateClient){
    return this.httpClient.put(`${baseUrl}/v0/clients/${user.id}/update`,user)
    }

  public getUserById(id:number){
    return this.httpClient.get(`${baseUrl}/v0/clients/getclient/${id}`)
  }
  
}
