import { Injectable } from '@angular/core';
import { CoreHttpService } from '../../../core/http/core-http.service';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { UserAuthModel } from '../models/auth.model';
import { LoginResponse } from '../models/login-response.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService extends CoreHttpService {
  private accessToken: string | null = null;
  userImg: BehaviorSubject<string> = new BehaviorSubject<string>('');
  userImg$ = this.userImg.asObservable();

  constructor(protected override http: HttpClient) {
    super(http);
  }

  public loginUser(authModel: UserAuthModel): Observable<LoginResponse> {
    return this.post<LoginResponse>(`Auth`, authModel);
  }

  setAccessToken(token: string): void {
    this.accessToken = token;
  }

  decodeToken(token: string): any {
    try {
      return JSON.parse(atob(token.split('.')[1]));
    } catch (error) {
      console.error('Error decoding token:', error);
      return null;
    }
  }

  setAccessTokenToLocalStorage(token: string): void {
    localStorage.setItem('accessToken', token);
  }

  getAccessTokenFromLocalStorage(): string | null {
    return localStorage.getItem('accessToken');
  }

  clearAccessTokenFromLocalStorage(): void {
    localStorage.removeItem('accessToken');
  }
}
