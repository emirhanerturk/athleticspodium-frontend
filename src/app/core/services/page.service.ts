import { Injectable } from '@angular/core';

import { ApiService } from "@services/api.service";
import { GenerateQuerySring } from '@services/util.service';
import { IResponse } from '@interfaces/response.interface';

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
  async Get(slug: string, section?: string): Promise<IResponse> {

    const qs = GenerateQuerySring({ section });

    return await this.apiService.get(`/pages/${slug}?${qs}`);

  }

}
