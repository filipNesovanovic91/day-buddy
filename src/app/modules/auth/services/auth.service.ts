import { Injectable } from "@angular/core";
import { CoreHttpService } from "../../../core/http/core-http.service";
import { HttpClient } from "@angular/common/http";
import { Observable, tap } from "rxjs";
import { AuthModel } from "../models/auth.model";
import { LoginResponse } from "../models/login-response.model";

@Injectable({
    providedIn: 'root',
})
export class AuthService extends CoreHttpService {
    private accessToken: string | null = null; 

    constructor(protected override http: HttpClient) {
        super(http);
    }

    public loginUser(authModel: AuthModel): Observable<LoginResponse> {
        return this.post<LoginResponse>(`Auth`, authModel);
    }

    setAccessToken(token: string): void {
        this.accessToken = token;
    }

    getAccessToken(): string | null {
        return this.accessToken;
    }

    decodeToken(token: string): any {
        try {
        return JSON.parse(atob(token.split('.')[1]));
        } catch (error) {
        console.error('Error decoding token:', error);
        return null;
        }
    }
}