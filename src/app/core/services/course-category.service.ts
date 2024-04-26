import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';


@Injectable({
  providedIn: 'root'
})
export class CourseCategoryService {

  API_URl = environment.serverUrl;
  baseUrl = this.API_URl + 'admin'
  constructor(public http: HttpClient) { }

  addCategory(obj: any){
    return this.http.post<any>(`${this.baseUrl}/addcategory`, obj);
  }

  getCategory(){
    return this.http.get<any>(`${this.baseUrl}/showcategories`);
  }

  deleteCategoryById(id : string){
    return this.http.delete<any>(`${this.baseUrl}/deletecategory/${id}`);
  }
  
  updateCategory(obj:any,id:any){
    return this.http.put<any>(`${this.baseUrl}/updatecategory/${id}`,obj);
  }
}
