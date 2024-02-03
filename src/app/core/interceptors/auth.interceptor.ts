import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from "@angular/common/http";
import { Observable, tap } from "rxjs";
import { AuthService } from "../../modules/auth/services/auth.service";
import { Injectable } from "@angular/core";

@Injectable() 
export class AuthInterceptor implements HttpInterceptor {

    constructor(private authService: AuthService) {

    }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        
        return next.handle(request).pipe(
            tap((event) => {
              if (event instanceof HttpResponse) {
                const token = event.body.accessToken;
                
                if(token) {
                    this.authService.setAccessToken(event.body.accessToken);
                }
              }
            })
          );
    }
}