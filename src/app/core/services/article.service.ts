import { Injectable } from '@angular/core';

import { ApiService } from "@services/api.service";
import { memoize } from "@decorators/memoize.decorator";
import { IResponse } from '@core/interfaces/response.interface';
import { GenerateQueryString } from './util.service';

@Injectable({
  providedIn: 'root'
})
export class ArticleService {

  constructor(private apiService: ApiService) { }

  /**
   * Get all athletes
   */
  @memoize({ json: true })
  List(filters?: object, limit?: number, offset?: number): Promise<IResponse> {

    const query = GenerateQueryString({ ...filters, limit, offset })
    return this.apiService.get(`/articles?${query}`);

  }

  /**
   * Get the article details
   * @param article_id
   */
  @memoize()
  Get(article_id: number): Promise<IResponse> {

    return this.apiService.get(`/articles/${article_id}`);

  }

  /**
   * Get featured articles
   */
  @memoize()
  GetFeaturedArticles(): Promise<IResponse> {

    return this.apiService.get(`/featured-articles`);

  }

}
