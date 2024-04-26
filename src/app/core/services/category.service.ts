import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
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

  getSubCategory(){
    return this.http.get<any>(`${this.baseUrl}/showsubcategories`);
  }

  deleteSubCategoryById(id:any){
    return this.http.delete<any>(`${this.baseUrl}/deletesubcategory/${id}`);
  }

  addSubCategory(obj : any){
    return this.http.post<any>(`${this.baseUrl}/addsubcategory`,obj);
  }

  updateSubCategory(obj:any,id:any){
    return this.http.put<any>(`${this.baseUrl}/updatesubcategory/${id}`,obj);
  }

  getLowerCategory(){
    return this.http.get<any>(`${this.baseUrl}/showlowercategories`);
  }

  deleteLowerCategoryById(id : any){
    return this.http.delete<any>(`${this.baseUrl}/deletelowercategory/${id}`);
  }

  addLowerSubCategory(obj: any){
    return this.http.post<any>(`${this.baseUrl}/addlowercategory`, obj);
  }

  updateLowerSubCategory(obj:any,id:any){
    return this.http.put<any>(`${this.baseUrl}/updatelowercategory/${id}`,obj);
  }

}
