import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private host: string = 'http://localhost:3001';
  private version: string = '1.0';

  private baseUrl: string = this.host + '/' + this.version;

  constructor(private http: HttpClient) { }

  get(endpoint: string) {
    return this.http.get<any>(this.baseUrl + endpoint);
  }

  post(endpoint: string, body: any = {}) {
    return this.http.post<any>(this.baseUrl + endpoint, body);
  }

}
