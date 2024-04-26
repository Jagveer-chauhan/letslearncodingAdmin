import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SliderService {

  API_URl = environment.serverUrl;
  baseUrl = this.API_URl + 'admin'
  constructor(public http: HttpClient) { }

  getSlider(){
    return this.http.get<any>(`${this.baseUrl}/showslider`);
  }

  addSlider(obj:any){
    return this.http.post<any>(`${this.baseUrl}/addslider`,obj);
  }

  updateSlider(obj:any,id:any){
    return this.http.put<any>(`${this.baseUrl}/updateslider/${id}`,obj);
  }
  
  deleteSlider(id:any){
    return this.http.delete<any>(`${this.baseUrl}/deleteslider/${id}`);
  }

}
