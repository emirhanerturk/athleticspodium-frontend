import { Injectable } from '@angular/core';

import { ApiService } from "@services/api.service";

import { IResponse } from '@core/interfaces/response.interface';

@Injectable({
  providedIn: 'root'
})
export class AthleteService {

  constructor(private apiService: ApiService) { }

  /**
   * Get the athlete details
   * @param athlete_id
   */
  async GetAthlete(athlete_id: number): Promise<IResponse> {

    return await this.apiService.get(`/athletes/${athlete_id}`);

  }

  /**
   * Get all medals of the athlete
   * @param athlete_id
   */
  async GetAthleteAllMedals(athlete_id: number): Promise<IResponse> {

    return await this.apiService.get(`/athletes/${athlete_id}/medals`);

  }

    /**
   * Get all athletes by first letter in last name
   * @param letter
   * @param page
   */
  async GetAthleteByFirstLetter(letter: string, page: number = 1): Promise<IResponse> {

    return await this.apiService.get(`/athletes/first-letter/${letter}/${page}`);

  }

  /**
   * Get related athletes
   * @param id
   */
  async GetRelatedAthletes(athlete_id: number): Promise<IResponse> {

    return await this.apiService.get(`/athletes/${athlete_id}/relateds`);

  }

}
