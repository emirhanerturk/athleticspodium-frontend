import { Injectable } from '@angular/core';

import { ApiService } from "@services/api.service";
import { GenerateQuerySring } from "@services/util.service";
import { IResponse } from '@interfaces/response.interface';
import { ICategoryInfo, ECategoryInfo } from '@enums/category.enum';

@Injectable({
  providedIn: 'root'
})
export class ChampsService {

  constructor(private apiService: ApiService) { }

  /**
   * Get all champs
   */
  async List(fields?: string[], order?: string, limit?: number): Promise<IResponse> {

    const qs = GenerateQuerySring({ fields, order, limit });

    return await this.apiService.get(`/champs?${qs}`);

  }

  /**
   * Get the champs details
   * @param champs champ id or slug
   */
  async GetChamps(champs: string|number): Promise<IResponse> {

    return await this.apiService.get(`/champs/${champs}`);

  }

  /**
   * Get counts group by country
   * @param champs_id
   * @param limit
   */
  async GetCounts(champs_id: number, limit?: number): Promise<IResponse> {

    const qs = GenerateQuerySring({ limit });
    
    return await this.apiService.get(`/champs/${champs_id}/counts?${qs}`);

  }

  GetCategories(): ICategoryInfo[] {

    return ECategoryInfo.filter(i => i.champs);

  }

}
