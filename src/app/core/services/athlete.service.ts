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

}
