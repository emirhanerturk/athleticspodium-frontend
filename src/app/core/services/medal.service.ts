import { Injectable } from '@angular/core';

import { ApiService } from "@services/api.service";
import { GenerateQueryString } from "@services/util.service";
import { IResponse } from '@interfaces/response.interface';

@Injectable({
  providedIn: 'root'
})
export class MedalService {

  constructor(private apiService: ApiService) { }

  /**
   * Get all medals
   */
  async List (query: Object): Promise<IResponse> {

    const qs = GenerateQueryString(query);

    return await this.apiService.get(`/medals?` + qs);

  }

  /**
   * Total count for medals
   */
  async TotalCount (): Promise<IResponse> {

    return await this.apiService.get(`/medals/total-count`);

  }

}
