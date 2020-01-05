import { Injectable, Output, EventEmitter } from '@angular/core';
import { Title } from '@angular/platform-browser';

import { ENavigation } from '@enums/navigation.enum';

export { ENavigation } from '@enums/navigation.enum';

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
  
}
