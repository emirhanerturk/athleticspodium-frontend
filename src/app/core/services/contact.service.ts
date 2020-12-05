import { Injectable } from '@angular/core';

import { ApiService } from "@services/api.service";
import { IResponse, IContact } from '@interfaces/index';

@Injectable({
  providedIn: 'root'
})
export class ContactService {

  constructor(private apiService: ApiService) { }

  /**
   * Create a contact entity
   */
  Create(fields: IContact): Promise<IResponse> {

    return this.apiService.post(`/contacts`, fields);

  }

}
