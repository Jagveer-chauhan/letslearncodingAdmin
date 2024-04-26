import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  userName: BehaviorSubject<boolean> = new BehaviorSubject(false);
  constructor() {
    const token = localStorage.getItem('token')
    if(token){
      this.userName.next(true);
    }
    else{
      this.userName.next(false);
    }
   }

  setToken(obj:any){
    localStorage.setItem('token',obj.token);
  }
}
