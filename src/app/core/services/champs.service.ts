import { Injectable } from '@angular/core';

import { ApiService } from "@services/api.service";
import { GenerateQuerySring } from "@services/util.service";
import { IResponse } from '@interfaces/response.interface';
import { EGender } from '@enums/gender.enum';
import { EChampsCategory } from '@enums/champs-category.enum';

@Injectable({
  providedIn: 'root'
})
export class ChampsService {

  constructor(private apiService: ApiService) { }

  /**
   * Get all champs
   */
  async List(fields?: string[], order?: string, limit?: number){

    const qs = GenerateQuerySring({ fields, order, limit });

    return await this.apiService.get(`/champs?${qs}`);

  }

  /**
   * Get the champs details
   * @param champs champ id or slug
   */
  async GetChamps(champs: string|number): Promise<IResponse>{

    return await this.apiService.get(`/champs/${champs}`);

  }

  /**
   * Get counts group by country
   * @param champs_id
   * @param gender
   * @param limit
   */
  async GetMedals(champs_id: number, gender?: EGender, limit?: number): Promise<IResponse> {

    const qs = GenerateQuerySring({ gender, limit });
    
    return await this.apiService.get(`/champs/${champs_id}/medals?${qs}`);

  }

  GetCategories(){

    return Object.values(EChampsCategory).filter(i => typeof i === 'number').map(i => ({ id: i, name: EChampsCategory[i] }));

  }

}
