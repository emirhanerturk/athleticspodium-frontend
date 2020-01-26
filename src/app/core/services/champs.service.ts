import { Injectable } from '@angular/core';

import { ApiService } from "@services/api.service";
import { GenerateQuerySring } from "@services/util.service";
import { IResponse } from '@interfaces/response.interface';
import { EGender } from '@enums/gender.enum';
import { EChampsCategory } from '@enums/champs-category.enum';
import { typeofExpr } from '@angular/compiler/src/output/output_ast';

@Injectable({
  providedIn: 'root'
})
export class ChampsService {

  private _categories: {
    0: {
      name: ''

    }
  }

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
