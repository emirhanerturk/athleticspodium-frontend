import { Injectable } from '@angular/core';

import { ApiService, GenerateQueryString } from "@services/index";
import { IResponse } from '@interfaces/response.interface';
import { ICategoryInfo, ECategoryInfo } from '@enums/category.enum';

@Injectable({
  providedIn: 'root'
})
export class CountryService {

  constructor(private apiService: ApiService) { }

  /**
   * Get all countries
   */
  async List (filters?: any, fields?: string[], order?: string, limit?: number): Promise<IResponse> {

    const qs = GenerateQueryString({ fields, order, limit });
    const qs_filters = GenerateQueryString(filters);

    return await this.apiService.get(`/countries?${qs}&${qs_filters}`);

  }

  /**
   * Get the country details
   * @param country_code country code
   */
  async GetCountry(country_code: string): Promise<IResponse> {

    return await this.apiService.get(`/countries/${country_code}`);

  }

  /**
   * Get counts group by champs
   * @param country_code country code
   */
  async GetMedals(country_code: string): Promise<IResponse> {

    return await this.apiService.get(`/countries/${country_code}/medals`);

  }

  /**
   * Get top athletes by country
   * @param country_code country code
   */
  async GetAthletes(country_code: string, limit?: number): Promise<IResponse> {

    const qs = GenerateQueryString({ limit });

    return await this.apiService.get(`/countries/${country_code}/athletes?${qs}`);

  }

  GetCategories(): ICategoryInfo[] {

    return ECategoryInfo.filter(i => i.country);

  }

}
