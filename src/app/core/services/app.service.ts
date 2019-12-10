import { Injectable, Output, EventEmitter } from '@angular/core';

import { ENavigation } from '@enums/navigation.enum';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  @Output() navigation: EventEmitter<ENavigation> = new EventEmitter();

  ENavigation = ENavigation;

  constructor() { }

  setNavigation(nav: ENavigation) {
    
    this.navigation.emit(nav);

  }
  
}
