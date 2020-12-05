import { Injectable } from '@angular/core';

import { ApiService } from "@services/api.service";
import { GenerateQueryString } from "@services/util.service";
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
  List (query: Object): Promise<IResponse> {

    const qs = GenerateQueryString(query);

    return this.apiService.get(`/medals?` + qs);

  }

  /**
   * Total count for medals
   */
  @memoize()
  TotalCount (): Promise<IResponse> {

    return this.apiService.get(`/medals/total-count`);

  }

}
