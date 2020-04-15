import { Injectable, Output, EventEmitter } from '@angular/core';
import { Title } from '@angular/platform-browser';

import { IError } from '@interfaces/response.interface';
import { ENavigation } from '@enums/navigation.enum';
import { ApiService } from './api.service';
export { ENavigation } from '@enums/navigation.enum';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  @Output() navigation: EventEmitter<ENavigation> = new EventEmitter();
  @Output() search: EventEmitter<boolean> = new EventEmitter();

  constructor(
    private titleService: Title,
    private apiService: ApiService) { }

  setNavigation(nav: ENavigation) {
    
    this.navigation.emit(nav);

  }

  setTitle(title: string, suffix: boolean = true){
    if (suffix) title += ' - Athletics Podium';
    this.titleService.setTitle(title);
  }

  openSearch(){

    this.search.emit(true);

  }

  async searchOnSite(q: string){

    return await this.apiService.get(`/search?q=${q}`);

  }


  logError(error: IError|IError[], point?: string){

    console.log(`AP_Error: ${point ? point + ': ' : ''}`, error);

    if (!Array.isArray(error)){
      if (error.fatal){
        console.log('AP_Error: Fatal!');
      }
    }

  }
  
}
