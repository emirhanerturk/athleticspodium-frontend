import { Injectable } from '@angular/core';

import { ApiService, GenerateQueryString } from "@services/index";
import { IResponse } from '@interfaces/response.interface';
import { memoize } from "@decorators/memoize.decorator";

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
  @memoize()
  async TotalCount (): Promise<IResponse> {

    return await this.apiService.get(`/medals/total-count`);

  }

}
