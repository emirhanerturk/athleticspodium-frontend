import { Injectable } from '@angular/core';

import { ApiService, GenerateQueryString } from "@services/index";
import { IResponse } from '@interfaces/response.interface';

@Injectable({
  providedIn: 'root'
})
export class EventService {

  constructor(private apiService: ApiService) { }

  /**
   * Get all events
   */
  async List (fields?: string[], order?: string, limit?: number): Promise<IResponse> {

    const qs = GenerateQueryString({ fields, order, limit });

    return await this.apiService.get(`/events?${qs}`);

  }

}
