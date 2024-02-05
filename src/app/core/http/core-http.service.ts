import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpOptions } from '../models/http-options.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export abstract class CoreHttpService {
  private readonly WEB_SERVICE_ADDRESS = `${environment.apiUrl}/api/`;

  constructor(protected http: HttpClient) {}

  /**
   * Generic GET method
   *
   * @param slug string - URL listed after web-service URL
   * @param queryParams string - GET request params
   * @param options HttpHeaders
   * @returns: Observable<T>
   */
  protected get<T>(slug: string, queryParams: string = '', options: HttpOptions | null = null): Observable<T> {
    if (queryParams) {
      slug += `?${queryParams}`;
    }
    return this.http.get<T>(`${this.WEB_SERVICE_ADDRESS}${slug}`, { ...options });
  }

  /**
   * Generic POST method
   *
   * @param slug string - URL listed after web-service URL
   * @param body any - POST method body
   * @param options HttpOptions
   * @returns Observable<T>
   */
  protected post<T>(slug: string, body: any, options: HttpOptions | null = null): Observable<T> {
    return this.http.post<T>(`${this.WEB_SERVICE_ADDRESS}${slug}`, body, { ...options });
  }

  protected put<T>(slug: string, body: any, options: HttpOptions | null = null) {
    return this.http.put<T>(`${this.WEB_SERVICE_ADDRESS}${slug}`, body, { ...options });
  }

  protected patch<T>(slug: string, body: any, options: HttpOptions | null = null) {
    return this.http.patch<T>(`${this.WEB_SERVICE_ADDRESS}${slug}`, body, { ...options });
  }

  protected delete<T>(slug: string, options: HttpOptions | null = null) {
    return this.http.delete<T>(`${this.WEB_SERVICE_ADDRESS}${slug}`, { ...options });
  }
}
