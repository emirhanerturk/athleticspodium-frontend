import { Injectable } from '@angular/core';

import { ApiService } from "@services/api.service";
import { memoize } from "@decorators/memoize.decorator";
import { IResponse } from '@core/interfaces/response.interface';

@Injectable({
  providedIn: 'root'
})
export class ArticleService {

  constructor(private apiService: ApiService) { }

  /**
   * Get the article details
   * @param article_id
   */
  @memoize()
  Get(article_id: number): Promise<IResponse> {

    return this.apiService.get(`/articles/${article_id}`);

  }


}
