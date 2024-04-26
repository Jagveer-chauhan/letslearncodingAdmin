import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';

@Injectable({
  providedIn: 'root'
})
export class InstituteCoursesService {

  API_URl = environment.serverUrl;
  baseUrl = this.API_URl + 'admin'
  constructor(public http: HttpClient) { }

  getInstituteCourses(){
    return this.http.get<any>(`${this.baseUrl}/institute-courses`);
  }

  addInstituteCourses(obj:any){
    return this.http.post<any>(`${this.baseUrl}/add-institute-course`,obj);
  }

  updateInstituteCourse(obj:any,id:any){
    return this.http.put<any>(`${this.baseUrl}/update-institute-course/${id}`,obj);
  }
  
  deleteInstituteCourse(id:any){
    return this.http.delete<any>(`${this.baseUrl}/delete-institute-course/${id}`);
  }
}
