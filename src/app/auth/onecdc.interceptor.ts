import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable, catchError, finalize, map, throwError } from 'rxjs';
import { exceptUrl } from 'app/core/constants/except-url';
import { LoaderService } from 'app/core/services/loader.service';
import { Router } from '@angular/router';

@Injectable()
export class OnetickCdcInterceptor implements HttpInterceptor{
    isExceptUrl : boolean = false;
    modifiedRequest!: HttpRequest<unknown>;
    totalNumber: number = 0;
    
    constructor(public loaderService: LoaderService, private router : Router ){

    }

    intercept(request: HttpRequest<unknown>, next: HttpHandler):Observable<HttpEvent<unknown>>{
        this.totalNumber++;
        this.loaderService.isLoading.next(true);

        const splitUrl =  request.url.split('/')
        const methodUrl = splitUrl[splitUrl.length -1]
        const ExceptUrl = exceptUrl.some((x: string) => {
            return x === methodUrl;
        })
        this.isExceptUrl = false;
        if(ExceptUrl){
            this.isExceptUrl = true;
        }
        if(!this.isExceptUrl){
              const token = localStorage.getItem('token');
              const headers = {
                authorization: token
              }
              this.modifiedRequest = request.clone({
                  setHeaders: headers
              })
              return next.handle(this.modifiedRequest).pipe(map((res:any)=>{
                  return res;
              }),
              catchError((error:any)=>{
                  return throwError(() => {
                      if (error.status == 401 && error.message == 'Unauthorized User') {
                        this.userLogout();
                      }
                      return error.error;
                    });
              }), finalize(() => {
                this.totalNumber--;
                if (this.totalNumber === 0) {
                  this.loaderService.isLoading.next(false);
                }
              })
              )
        }
        return next.handle(request).pipe(            
            map((res: any) => {
              return res;
            }),
            catchError((error: any) => {
              if (error.status == 401 && error.message == 'Unauthorized User') {
                this.userLogout();
              }
              return throwError(() => {
                if (error.status == 0) {
                  return { message: `Please Check Your Internet Connection or Server May be down`, status: 0 };
                }
                return error.error;
              });
            }),
            finalize(() => {
              this.totalNumber--;
              if (this.totalNumber === 0) {
                this.loaderService.isLoading.next(false);
              }
            })
          );
    }

    private userLogout() {
      localStorage.clear();
      this.router.navigate(['/']);
    }
}
