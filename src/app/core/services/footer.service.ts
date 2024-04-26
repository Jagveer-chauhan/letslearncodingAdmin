import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FooterService {

  API_URL = environment.serverUrl;
  baseUrl = this.API_URL + 'admin'
  constructor(public http : HttpClient) { }

  
  getFooter(){
    return this.http.get<any>(`${this.baseUrl}/showlinks`);
  }

  addFooter(obj:any){
    return this.http.post<any>(`${this.baseUrl}/addlink`,obj);
  }

  updateFooter(obj:any,id:any){
    return this.http.put<any>(`${this.baseUrl}/updatelink/${id}`,obj);
  }
  
  deleteFooter(id:any){
    return this.http.delete<any>(`${this.baseUrl}/deletlink/${id}`);
  }

}
