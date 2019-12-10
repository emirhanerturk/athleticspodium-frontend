import { Injectable } from '@angular/core';

import { EStorage } from '@enums/storage.enum';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  storages = EStorage;

  constructor() { }

  get (key: EStorage): any {
    try {
      return JSON.parse(localStorage.getItem(key));
    } catch (e) {
      console.error('Error getting data from localStorage: ', e);
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
      console.error('Error saving to localStorage: ', e);
    }
  }

  remove (key: EStorage): void {
    localStorage.removeItem(key);
  }

}
