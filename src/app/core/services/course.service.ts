import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { ILogin } from '../interfaces/login';
@Injectable({
  providedIn: 'root'
})
export class CourseService {
  API_URl = environment.serverUrl;
  baseUrl = this.API_URl +'admin/'
  constructor(public http:HttpClient) { }

  addCoursePage(obj:any){
    return this.http.post<any>(`${this.baseUrl}addcourse`,obj)
  }

  getCategoriesList(){
    return this.http.get<any>(`${this.baseUrl}showcategories`)
  }

  // addImage(obj:any, id: number){
  //   return this.http.post<any>(`${this.baseUrl}add-course-image?course_id=${id}`, obj)
  // }

  getCoursePages(){
    return this.http.get<any>(`${this.API_URl}showcourses`)
  }

  getCoursePageDetails(id:any){
    return this.http.get<any>(`${this.API_URl}coursedetail?course_id=${id}`)
  }
  deleteCoursePage(course_id:any){
    return this.http.delete<any>(`${this.baseUrl}deletecourse/${course_id}`)
  }

  updateCourse(id:number,obj:any){
    return this.http.put<any>(`${this.baseUrl}updatecourse/${id}`, obj)
  }

  updateCoursePageImages(obj:any){
    return this.http.post<any>(`${this.baseUrl}update-course-image`, obj)
  }

  add_CourseContent(obj:any){
    return this.http.post<any>(`${this.baseUrl}add-course-content`, obj)
  }

  add_Faq(obj:any){
    return this.http.post<any>(`${this.baseUrl}add-faqs`, obj)
  }

  update_CourseContent_OR_FAQ(id:any, obj:any){
    return this.http.put<any>(`${this.baseUrl}update-course-content/${id}`, obj)
  }

  delete_CourseContent_OR_FAQ(id:any){
    return this.http.delete<any>(`${this.baseUrl}delete-course-content/${id}`)
  }

  addCourseReview(obj:any){
    return this.http.post<any>(`${this.baseUrl}add-review`, obj)
  }

  updateCourseReview(id:any, obj:any){
    return this.http.put<any>(`${this.baseUrl}update-review/${id}`, obj)
  }

  deleteReview(id:any){
    return this.http.delete<any>(`${this.baseUrl}delete-review/${id}`)
  }

  updateBrochure(obj:any,id:any){
    return  this.http.put(`${this.baseUrl}update-course-brouchure/${id}`,obj);
  }
}
