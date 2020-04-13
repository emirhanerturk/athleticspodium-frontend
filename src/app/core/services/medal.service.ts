import { Injectable } from '@angular/core';

import { ApiService } from "@services/api.service";
import { GenerateQuerySring } from "@services/util.service";
import { IResponse } from '@interfaces/response.interface';

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

  /**
   * Total count for medals
   */
  async TotalCount (): Promise<IResponse> {

    return await this.apiService.get(`/medals/total-count`);

  }

}
