import { Injectable } from '@angular/core';

import { ApiService } from "@services/api.service";
import { IResponse } from '@interfaces/response.interface';
import { IContact } from '@interfaces/models.interface';

@Injectable({
  providedIn: 'root'
})
export class ContactService {

  constructor(private apiService: ApiService) { }

  /**
   * Create a contact entity
   */
  async Create(fields: IContact): Promise<IResponse> {

    return await this.apiService.post(`/contacts`, fields);

  }

}
