import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';

@Injectable({
  providedIn: 'root'
})
export class StudentCornerService {

  API_URl = environment.serverUrl;
  baseUrl = this.API_URl + 'admin'
  constructor(public http: HttpClient) { }

  // Company API

  getCompany(){
    return this.http.get<any>(`${this.baseUrl}/showcompanies`);
  }

  addCompany(obj:any){
    return this.http.post<any>(`${this.baseUrl}/addcompany`,obj);
  }

  updateCompany(obj:any,id:any){
    return this.http.put<any>(`${this.baseUrl}/updatecompany/${id}`,obj);
  }
  
  deleteCompany(id:any){
    return this.http.delete<any>(`${this.baseUrl}/deletecompany/${id}`);
  }

  // Links URL 

  getLink(){
    return this.http.get<any>(`${this.baseUrl}/showReviews`);
  }

  addLink(obj:any){
    return this.http.post<any>(`${this.baseUrl}/addReview`,obj);
  }

  updateLink(obj:any,id:any){
    return this.http.put<any>(`${this.baseUrl}/updateReview/${id}`,obj);
  }
  
  deleteLink(id:any){
    return this.http.delete<any>(`${this.baseUrl}/deleteReview/${id}`);
  }

  // event 

  getEvent(){
    return this.http.get<any>(`${this.baseUrl}/events`);
  }

  addEvent(obj:any){
    return this.http.post<any>(`${this.baseUrl}/add-event`,obj);
  }

  updateEvent(obj:any,id:any){
    return this.http.put<any>(`${this.baseUrl}/update-event/${id}`,obj);
  }
  
  deleteEvent(id:any){
    return this.http.delete<any>(`${this.baseUrl}/delete-event/${id}`);
  }

}
