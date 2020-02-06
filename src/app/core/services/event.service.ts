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

  /**
   * Get the event details
   * @param event_id
   */
  async GetCountry(event_id: number): Promise<IResponse> {

    return await this.apiService.get(`/events/${event_id}`);

  }

}
