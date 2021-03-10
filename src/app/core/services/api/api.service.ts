import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

import { HttpEndpoints } from "../../models";
import { IHttpOptions } from "../../interface";

@Injectable({
  providedIn: "root"
})
export class ApiService {

  constructor(
    private readonly _http: HttpClient,
  ) { }

  get = (endpoint: string, options: IHttpOptions = {}): Observable<any> => {
    const { url, params, headers } = new HttpEndpoints().getRequestOption({ endpoint, ...options });
    return this._http.get(url, { params, headers });
  }

  post = <T>(endpoint: string, data: T, options: IHttpOptions = {}): Observable<any> => {
    const { url, params, headers } = new HttpEndpoints().getRequestOption({ endpoint, ...options });
    return this._http.post(url, data, { params, headers });
  }

  put = <T>(endpoint: string, data: T, options: IHttpOptions = {}): Observable<any> => {
    const { url, params, headers } = new HttpEndpoints().getRequestOption({ endpoint, ...options });
    return this._http.put(url, data, { params, headers });
  }

  patch = <T>(endpoint: string, data: T, options: IHttpOptions = {}): Observable<any> => {
    const { url, params, headers } = new HttpEndpoints().getRequestOption({ endpoint, ...options });
    return this._http.patch(url, data, { params, headers });
  }

  delete = (endpoint: string, options: IHttpOptions = {}): Observable<any> => {
    const { url, params, headers } = new HttpEndpoints().getRequestOption({ endpoint, ...options });
    return this._http.delete(url, { params, headers });
  }

}
