import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TeacherService {

  API_URl = environment.serverUrl;
  baseUrl = this.API_URl + 'admin'
  constructor(public http: HttpClient) { }

  getTeacher(){
    return this.http.get<any>(`${this.baseUrl}/showteachers`);
  }

  addTeacher(obj:any){
    return this.http.post<any>(`${this.baseUrl}/addteacher`,obj);
  }

  updateTeacher(obj:any,id:any){
    return this.http.put<any>(`${this.baseUrl}/updateteacher/${id}`,obj);
  }
  
  deleteTeacher(id:any){
    return this.http.delete<any>(`${this.baseUrl}/deleteteacher/${id}`);
  }
}
