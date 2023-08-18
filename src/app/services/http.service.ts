import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private http: HttpClient) { }

  get<T>(url: string, options?: any): Observable<HttpEvent<T>> {
    return this.http.get<T>(url, options)
  }

  post<T>(url: string, body: any, options?: any): Observable<HttpEvent<T>> {
    return this.http.post<T>(url, body, options);
  }

  put<T>(url: string, body: any, options?: any): Observable<HttpEvent<T>> {
    return this.http.put<T>(url, body, options);
  }

  delete<T>(url: string, options?: any): Observable<HttpEvent<T>> {
    return this.http.delete<T>(url, options);
  }
}
