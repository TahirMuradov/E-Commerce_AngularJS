import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class HttpClientService {
  constructor(private httpClient: HttpClient) {}

  private url(requestParametres: Partial<RequestParameters>): string {
    return `${
      requestParametres.baseUrl ? requestParametres.baseUrl : environment.apiUrl
    }/${requestParametres.controller}/${
      requestParametres.action ? requestParametres.action : ''
    }`;
  }

  get<T>(
    requestParametres: Partial<RequestParameters>,
    id?: string
  ): Observable<T> {
    let url: string = '';
    requestParametres.fullEndPoint
      ? (url = requestParametres.fullEndPoint)
      : (url = `${this.url(requestParametres)}${id ? `/${id}` : ''}`);

    return this.httpClient.get<T>(url, { headers: requestParametres.headers });
  }
  post<T>(
    requestParameter: Partial<RequestParameters>,
    body: Partial<T>
  ): Observable<T> {
    let url: string = '';
    if (requestParameter.fullEndPoint) url = requestParameter.fullEndPoint;
    else
      url = `${this.url(requestParameter)}${
        requestParameter.queryString ? `?${requestParameter.queryString}` : ''
      }`;

    return this.httpClient.post<T>(url, body, {
      headers: requestParameter.headers,
      responseType: requestParameter.responseType as 'json',
    });
  }
  put<T>(
    requestParameter: Partial<RequestParameters>,
    body: Partial<T>
  ): Observable<T> {
    let url: string = '';
    if (requestParameter.fullEndPoint) url = requestParameter.fullEndPoint;
    else
      url = `${this.url(requestParameter)}${
        requestParameter.queryString ? `?${requestParameter.queryString}` : ''
      }`;

    return this.httpClient.put<T>(url, body, {
      headers: requestParameter.headers,
      responseType: requestParameter.responseType as 'json',
    });
  }
  delete<T>(
    requestParameter: Partial<RequestParameters>,
    id: string
  ): Observable<T> {
    let url: string = '';
    if (requestParameter.fullEndPoint) url = requestParameter.fullEndPoint;
    else
      url = `${this.url(requestParameter)}/${id}${
        requestParameter.queryString ? `?${requestParameter.queryString}` : ''
      }`;

    return this.httpClient.delete<T>(url, {
      headers: requestParameter.headers,
      responseType: requestParameter.responseType as 'json',
    });
  }
}

export class RequestParameters {
  controller?: string;
  action?: string;
  headers?: HttpHeaders;
  baseUrl?: string;
  queryString?: string;
  fullEndPoint?: string;
  responseType?: string = 'json';
}
