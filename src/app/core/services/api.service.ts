import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from '@env/environment';

import { IResponse } from "@interfaces/response.interface";

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private host: string = environment.api.host;
  private version: string = environment.api.version;

  private baseUrl: string = this.host + '/' + this.version;

  constructor(private http: HttpClient) { }

  async get(endpoint: string): Promise<IResponse> {
    
    try {
      return this.http.get<IResponse>(this.baseUrl + endpoint).toPromise();      
    } catch (error) {
      return Promise.resolve({ success: false, error: { code: error.status, message: error.statusText } })
    }
    
  }

  async post(endpoint: string, body: any = {}): Promise<IResponse> {
    
    try {
      return this.http.post<IResponse>(this.baseUrl + endpoint, body).toPromise();
    } catch (error) {
      return Promise.resolve({ success: false, error: { code: error.status, message: error.statusText } })
    }
    
  }

}
