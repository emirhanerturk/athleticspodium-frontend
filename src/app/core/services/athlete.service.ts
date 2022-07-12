import { Injectable } from '@angular/core';

import { ApiService } from "@services/api.service";
import { GenerateQueryString } from "@services/util.service";
import { IResponse } from '@interfaces/response.interface';
import { memoize } from "@decorators/memoize.decorator";

@Injectable({
  providedIn: 'root',
})
export class AthleteService {
  constructor(private apiService: ApiService) {}

  /**
   * Get all athletes
   */
  @memoize({ json: true })
  List(
    filters?: object,
    fields?: string[],
    order?: string,
    limit?: number,
    offset?: number
  ): Promise<IResponse> {
    const query = GenerateQueryString({
      ...filters,
      fields,
      order,
      limit,
      offset,
    });

    return this.apiService.get(`/athletes?${query}`);
  }

  /**
   * Get the athlete details
   * @param athlete_id
   */
  @memoize()
  GetAthlete(athlete_id: number): Promise<IResponse> {
    return this.apiService.get(`/athletes/${athlete_id}`);
  }

  /**
   * Get all medals of the athlete
   * @param athlete_id
   */
  @memoize()
  GetAthleteAllMedals(athlete_id: number): Promise<IResponse> {
    return this.apiService.get(`/athletes/${athlete_id}/medals`);
  }

  /**
   * Get all athletes by first letter in last name
   * @param letter
   * @param page
   */
  @memoize()
  GetAthleteByFirstLetter(
    letter: string,
    page: number = 1
  ): Promise<IResponse> {
    return this.apiService.get(`/athletes/first-letter/${letter}/${page}`);
  }

  /**
   * Get related athletes
   * @param athlete_id
   */
  @memoize()
  GetRelatedAthletes(athlete_id: number): Promise<IResponse> {
    return this.apiService.get(`/athletes/${athlete_id}/relateds`);
  }

  /**
   * Get olympians
   * @param athlete_id
   */
  @memoize()
  GetOlympians(athlete_id: number): Promise<IResponse> {
    return this.apiService.get(`/athletes/${athlete_id}/olympians`);
  }

  /**
   * Get featured athletes
   */
  @memoize()
  GetFeaturedAthletes(): Promise<IResponse> {
    return this.apiService.get(`/featured-athletes`);
  }
}
