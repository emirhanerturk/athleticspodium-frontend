import { Injectable } from '@angular/core';

import { ApiService } from "@services/api.service";

@Injectable({
  providedIn: 'root'
})
export class ChampsService {

  constructor(private apiService: ApiService) { }

  /**
   * Getting the champ details
   * @param champ champ id or slug
   */
  GetChamp(champ: string|number){

    return this.apiService.get(`/champs/${champ}`);

  }

}
