import { Injectable } from '@angular/core';

import { ApiService } from "@services/api.service";
import { GenerateQuerySring } from '@services/util.service';
import { IResponse } from '@interfaces/response.interface';

@Injectable({
  providedIn: 'root'
})
export class CountryService {

  constructor(private apiService: ApiService) { }

  /**
   * Get all countries
   */
  async List (fields?: string[], order?: string, limit?: number): Promise<IResponse> {

    const qs = GenerateQuerySring({ fields, order, limit });

    return await this.apiService.get(`/countries`);

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
  async GetTopAthletes(country_code: string): Promise<IResponse> {

    return await this.apiService.get(`/countries/${country_code}/top-athletes`);

  }

}
