import { Injectable } from '@angular/core';

import { AppService } from "@services/app.service";
import { EStorage } from '@enums/storage.enum';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  storages = EStorage;

  constructor(private appService: AppService) { }

  get (key: EStorage): any {

    try {
      return JSON.parse(localStorage.getItem(key));
    } catch (e) {
      this.appService.logError({ message: `Error getting data from local storage: ${key}`, code: 500 })
      return null;
    }

  }

  
  set (key: EStorage, data: any, override: boolean = false): void {

    try {

      if (override){
        let value = this.get(key);
        data = Object.assign(value, data);
      }
      
      localStorage.setItem(key, JSON.stringify(data));

    } catch (e) {
      this.appService.logError({ message: `Error saving to local storage: ${key}`, code: 500 })
    }

  }

  remove (key: EStorage): void {
    localStorage.removeItem(key);
  }

}
