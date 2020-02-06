import { Injectable } from '@angular/core';

import { ApiService } from "@services/api.service";
import { GenerateQuerySring } from "@services/util.service";
import { IResponse } from '@core/interfaces/response.interface';

@Injectable({
  providedIn: 'root'
})
export class MedalService {

  constructor(private apiService: ApiService) { }

  /**
   * Search from medals
   */
  async Search (query: Object): Promise<IResponse> {

    const qs = GenerateQuerySring(query);

    return await this.apiService.get(`/medals/search?` + qs);

  }

}
