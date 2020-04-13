import { Injectable, Output, EventEmitter } from '@angular/core';
import { Title } from '@angular/platform-browser';

import { IError } from '@interfaces/response.interface';
import { ENavigation } from '@enums/navigation.enum';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  @Output() navigation: EventEmitter<ENavigation> = new EventEmitter();

  constructor(private titleService: Title) { }

  setNavigation(nav: ENavigation) {
    
    this.navigation.emit(nav);

  }

  setTitle(title: string, suffix: boolean = true){
    if (suffix) title += ' - Athletics Podium';
    this.titleService.setTitle(title);
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
