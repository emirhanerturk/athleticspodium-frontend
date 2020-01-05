import { Injectable } from '@angular/core';

import { ApiService } from "@services/api.service";

import { IResponse } from '@core/interfaces/response.interface';

@Injectable({
  providedIn: 'root'
})
export class PlayerService {

  constructor(private apiService: ApiService) { }

  /**
   * Get the player details
   * @param player_id player id
   */
  async GetPlayer(player_id: number): Promise<IResponse> {

    return await this.apiService.get(`/players/${player_id}`);

  }

  /**
   * Get all medals of the player
   * @param player_id player id
   */
  async GetPlayerAllMedals(player_id: number): Promise<IResponse> {

    return await this.apiService.get(`/players/${player_id}/medals`);

  }

}
