import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EnquiryService {

  constructor(private http: HttpClient) { }

  API_URl = environment.serverUrl;
  baseUrl = this.API_URl + 'admin'

  getEnquiries(){
    return this.http.get<any>(`${this.baseUrl}/show-enquiries`);
  }
  
  getLandingEnquires(){
    return this.http.get<any>(`${this.baseUrl}/show-enquiries`);
  }

  // getLandingEnquirieCourseList(){
  //   return this.http.get<any>(`${this.API_URl}enquirycourses`);
  // }


  deleteEnquiry(id:any){
    return this.http.delete<any>(`${this.baseUrl}/delete/${id}`)
  }
}
