import { Injectable } from '@angular/core';

import { ApiService } from "@services/api.service";
import { GenerateQuerySring } from "@services/util.service";
import { IResponse } from '@interfaces/response.interface';
import { EGender } from '@enums/gender.enum';

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
   * @param meeting_id
   */
  async GetMedals(meeting_id: number, gender: EGender): Promise<IResponse> {

    const qs = GenerateQuerySring({ gender });

    return await this.apiService.get(`/meetings/${meeting_id}/medals?${qs}`);

  }

  /**
   * Get counts group by country
   * @param meeting_id
   * @param limit
   */
  async GetCounts(meeting_id: number, limit?: number): Promise<IResponse> {

    const qs = GenerateQuerySring({ limit });
    
    return await this.apiService.get(`/meetings/${meeting_id}/counts?${qs}`);

  }

  /**
   * Get last added 10 meetings
   */
  async GetLastMeetings(): Promise<IResponse> {

    return await this.apiService.get(`/meetings/last-meetings`);

  }

}
