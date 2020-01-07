import { Injectable } from '@angular/core';

import { ApiService } from "@services/api.service";
import { GenerateQuerySring } from "@services/util.service";

@Injectable({
  providedIn: 'root'
})
export class ChampsService {

  constructor(private apiService: ApiService) { }

  /**
   * Get all champs
   */
  async List (){

    return await this.apiService.get(`/champs`);

  }

  /**
   * Get the champs details
   * @param champs champ id or slug
   */
  async GetChamps(champs: string|number){

    return await this.apiService.get(`/champs/${champs}`);

  }

  /**
   * Get counts group by country
   * @param champs_id champ id
   * @param gender if man 1 else if women 0
   * @param limit rows of limit
   */
  async GetMedals(champs_id: number, gender?: number, limit?: number){

    const qs = GenerateQuerySring({ gender, limit });
    
    return await this.apiService.get(`/champs/${champs_id}/medals?${qs}`);

  }

}
