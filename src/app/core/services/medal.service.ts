import { Injectable } from '@angular/core';

import { ApiService } from '@services/api.service';
import { GenerateQueryString } from '@services/util.service';
import { IResponse } from '@interfaces/response.interface';
import { memoize } from '@decorators/memoize.decorator';

@Injectable({
  providedIn: 'root',
})
export class MedalService {
  constructor(private apiService: ApiService) {}

  @memoize({ json: true })
  List(query: object): Promise<IResponse> {
    const qs = GenerateQueryString(query);

    return this.apiService.get(`/medals?` + qs);
  }

  @memoize({ json: true })
  CountryChamps(query: object): Promise<IResponse> {
    const qs = GenerateQueryString(query);

    return this.apiService.get(`/medals/country-champs?` + qs);
  }

  @memoize()
  TotalCount(): Promise<IResponse> {
    return this.apiService.get(`/medals/total-count`);
  }
}
