import { Injectable } from '@angular/core';

import { ApiService } from "@services/api.service";
import { GenerateQueryString } from "@services/util.service";
import { IResponse } from '@interfaces/response.interface';
import { ICategoryInfo, ECategoryInfo } from '@enums/category.enum';
import { memoize } from "@decorators/memoize.decorator";

@Injectable({
  providedIn: 'root'
})
export class ChampsService {

  constructor(private apiService: ApiService) { }

  /**
   * Get all champs
   */
  @memoize()
  List(fields?: string[], order?: string, limit?: number): Promise<IResponse> {

    const qs = GenerateQueryString({ fields, order, limit });

    return this.apiService.get(`/champs?${qs}`);

  }

  /**
   * Get the champs details
   * @param champs champ id or slug
   */
  GetChamps(champs: string|number): Promise<IResponse> {

    return this.apiService.get(`/champs/${champs}`);

  }

  /**
   * Get counts group by country
   * @param champs_id
   * @param limit
   */
  GetCounts(champs_id: number, limit?: number): Promise<IResponse> {

    const qs = GenerateQueryString({ limit });
    
    return this.apiService.get(`/champs/${champs_id}/counts?${qs}`);

  }

  GetCategories(): ICategoryInfo[] {

    return ECategoryInfo.filter(i => i.champs);

  }

}
