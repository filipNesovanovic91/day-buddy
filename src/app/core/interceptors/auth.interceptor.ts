import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from "@angular/common/http";
import { Observable } from "rxjs";
import { tap } from "rxjs/operators";
import { AuthService } from "../../modules/auth/services/auth.service";
import { Injectable } from "@angular/core";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

    constructor(private authService: AuthService) {}

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const token = this.authService.getAccessTokenFromLocalStorage();
        if (token) {
            request = this.addAuthorizationHeader(request, token);
        }
        return next.handle(request).pipe(
            tap((event) => {
                if (event instanceof HttpResponse && event.body?.accessToken) {
                    this.authService.setAccessTokenToLocalStorage(event.body.accessToken);
                }
            })
        );
    }
    
    private addAuthorizationHeader(request: HttpRequest<any>, token: string): HttpRequest<any> {
        return request.clone({
            setHeaders: {
                'Authorization': 'Bearer ' + token
            }
        });
    }
}
