import { Injectable } from '@angular/core';

import { ApiService } from "@services/api.service";

import { IResponse } from '@core/interfaces/response.interface';

@Injectable({
  providedIn: 'root'
})
export class CountryService {

  constructor(private apiService: ApiService) { }

  /**
   * Get all countries
   */
  async List (){

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
  async GetCountsGroupByChamps(country_code: string): Promise<IResponse> {

    return await this.apiService.get(`/countries/${country_code}/counts-group-by-champs`);

  }

}
