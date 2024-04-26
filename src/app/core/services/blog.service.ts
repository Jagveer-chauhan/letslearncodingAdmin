import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BlogService {

  API_URl = environment.serverUrl;
  baseUrl = this.API_URl + 'admin/'
  constructor(public http: HttpClient) { }

  getBlog(){
    return this.http.get<any>(`${this.API_URl}showblogs`);
  }

  getBlogByID(id:any){
    return this.http.get<any>(`${this.API_URl}blogDetails?id=${id}`)
  }

  addBlog(obj:any){
    return this.http.post<any>(`${this.baseUrl}addblog`,obj);
  }

  updateBlog(obj:any,id:any){
    return this.http.post<any>(`${this.baseUrl}updateblog/${id}`,obj);
  }
  
  deleteBlog(id:any){
    return this.http.delete<any>(`${this.baseUrl}deleteblog/${id}`);
  }

  addBlogSubHeading(obj:any){
    return this.http.post<any>(`${this.baseUrl}add-blog-subheading`, obj)
  }

  updateBlogSubHeading(obj:any){
    return this.http.put<any>(`${this.baseUrl}update-blog-subheading`, obj)
  }

  updateBlogImage(obj:any){
    return this.http.put<any>(`${this.baseUrl}update-blog-image`, obj);
  }

  removeSubTitleCard(id:any){
    return this.http.delete<any>(`${this.baseUrl}delete-blog-subheading?id=${id}`)
  }
}
