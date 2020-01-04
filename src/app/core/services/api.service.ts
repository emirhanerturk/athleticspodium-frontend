import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from '../../../environments/environment';

import { IResponse } from "@interfaces/response.interface";

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private host: string = environment.api.host;
  private version: string = environment.api.version;

  private baseUrl: string = this.host + '/' + this.version;

  constructor(private http: HttpClient) { }

  get(endpoint: string): Promise<IResponse> {
    return this.http.get<IResponse>(this.baseUrl + endpoint).toPromise();
  }

  post(endpoint: string, body: any = {}): Promise<IResponse> {
    return this.http.post<IResponse>(this.baseUrl + endpoint, body).toPromise();
  }

}
