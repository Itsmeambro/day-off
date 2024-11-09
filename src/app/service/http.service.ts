import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private http: HttpClient) { }

  public httpGet<T>(url:string,headers:any): Observable<any> {
    return this.http.get<any>(url, { headers });
  }

  public httpGetWithParams<T>(url:string,params: any,headers:any): Observable<any> {
    return this.http.get<any>(url, { headers, params});
  }

  public httpPost<T>(url:string, params: any ,headers:any): Observable<T> {
    return this.http.post<any>(url, params,{ headers });
  }

  public httpPut<T>(url:string, params: any ,headers:any): Observable<T> {
    return this.http.post<any>(url, params,{ headers })
  }

  public httpDelete<T>(url:string, headers:any): Observable<T> {
    return this.http.delete<any>(url, { headers })
  }

}
