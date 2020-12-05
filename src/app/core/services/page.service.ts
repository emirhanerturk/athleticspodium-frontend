import { Injectable } from '@angular/core';

import { ApiService } from "@services/api.service";
import { GenerateQueryString } from "@services/util.service";
import { IResponse } from '@interfaces/response.interface';
import { memoize } from "@decorators/memoize.decorator";

@Injectable({
  providedIn: 'root'
})
export class PageService {

  constructor(private apiService: ApiService) { }

  /**
   * Get a page
   * @param slug
   * @param section
   */
  @memoize()
  async Get(slug: string, section?: string): Promise<IResponse> {

    const qs = GenerateQueryString({ section });

    return await this.apiService.get(`/pages/${slug}?${qs}`);

  }

}
