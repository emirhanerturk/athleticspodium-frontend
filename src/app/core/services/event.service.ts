import { Injectable } from '@angular/core';

import { ApiService } from "@services/api.service";
import { GenerateQuerySring } from '@services/util.service';
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

    const qs = GenerateQuerySring({ fields, order, limit });

    return await this.apiService.get(`/events?${qs}`);

  }

}
