import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { ILogin } from '../interfaces/login';
@Injectable({
  providedIn: 'root'
})
export class LoginService {
  API_URl = environment.serverUrl;
  baseUrl = this.API_URl 
  constructor(public http:HttpClient) { }

  logIn(obj:ILogin){
    return this.http.post<any>(`${this.baseUrl}signin`,obj)
  }
}
