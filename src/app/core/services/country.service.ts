import { Injectable } from '@angular/core';

import { ApiService } from "@services/api.service";
import { GenerateQueryString } from "@services/util.service";
import { IResponse } from '@interfaces/response.interface';
import { ICategoryInfo, ECategoryInfo } from '@enums/category.enum';
import { memoize } from "@decorators/memoize.decorator";

@Injectable({
  providedIn: 'root'
})
export class CountryService {

  constructor(private apiService: ApiService) { }

  /**
   * Get all countries
   */
  @memoize({ json: true })
  List (filters?: Object, fields?: string[], order?: string, limit?: number): Promise<IResponse> {

    const qs = GenerateQueryString({ fields, order, limit, ...filters });

    return this.apiService.get(`/countries?${qs}`);

  }

  /**
   * Get the country details
   * @param country_code country code
   */
  @memoize()
  GetCountry(country_code: string): Promise<IResponse> {

    return this.apiService.get(`/countries/${country_code}`);

  }

  /**
   * Get counts group by champs
   * @param country_code country code
   */
  GetMedals(country_code: string): Promise<IResponse> {

    return this.apiService.get(`/countries/${country_code}/medals`);

  }

  /**
   * Get top athletes by country
   * @param country_code country code
   */
  @memoize()
  GetAthletes(country_code: string, limit?: number): Promise<IResponse> {

    const qs = GenerateQueryString({ limit });

    return this.apiService.get(`/countries/${country_code}/athletes?${qs}`);

  }

  GetCategories(): ICategoryInfo[] {

    return ECategoryInfo.filter(i => i.country);

  }

}
