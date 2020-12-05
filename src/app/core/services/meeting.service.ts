import { Injectable } from '@angular/core';

import { ApiService } from "@services/api.service";
import { GenerateQueryString } from "@services/util.service";
import { IResponse } from '@interfaces/response.interface';
import { memoize } from "@decorators/memoize.decorator";

@Injectable({
  providedIn: 'root'
})
export class MeetingService {

  constructor(private apiService: ApiService) { }

  /**
   * Get all meetings
   * @param year
   */
  @memoize()
  List(year: number, limit?: number): Promise<IResponse> {

    const qs = GenerateQueryString({ year, limit });

    return this.apiService.get(`/meetings?${qs}`);

  }

  /**
   * Get the meeting details
   * @param meeting meeting id or slug
   */
  GetMeeting(meeting: string|number): Promise<IResponse>{

    return this.apiService.get(`/meetings/${meeting}`);

  }

  /**
   * Get the meeting's medals
   * @param meeting_id
   */
  GetMedals(meeting_id: number): Promise<IResponse> {

    return this.apiService.get(`/meetings/${meeting_id}/medals`);

  }

  /**
   * Get counts group by country
   * @param meeting_id
   * @param limit
   */
  GetCounts(meeting_id: number, limit?: number): Promise<IResponse> {

    const qs = GenerateQueryString({ limit });
    
    return this.apiService.get(`/meetings/${meeting_id}/counts?${qs}`);

  }

  /**
   * Get last added 5 meetings
   */
  @memoize()
  GetLastMeetings(): Promise<IResponse> {

    return this.apiService.get(`/meetings/last-meetings`);

  }

  /**
   * Get upcoming meetings
   */
  @memoize()
  GetUpcomingMeetings(): Promise<IResponse> {

    return this.apiService.get(`/meetings/upcoming-meetings`);

  }

}
