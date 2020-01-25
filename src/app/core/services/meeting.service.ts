import { Injectable } from '@angular/core';

import { ApiService } from "@services/api.service";
import { IResponse } from '@core/interfaces/response.interface';
import { GenerateQuerySring } from "@services/util.service";

@Injectable({
  providedIn: 'root'
})
export class MeetingService {

  constructor(private apiService: ApiService) { }

  /**
   * Get all meetings
   * @param year
   */
  async List(year: number, limit?: number): Promise<IResponse> {

    const qs = GenerateQuerySring({ year, limit });

    return await this.apiService.get(`/meetings/?${qs}`);

  }

  /**
   * Get the meeting's medals
   * @param meeting_id number
   */
  async GetMedals(meeting_id: number): Promise<IResponse> {

    return await this.apiService.get(`/meetings/${meeting_id}/medals`);

  }

}
