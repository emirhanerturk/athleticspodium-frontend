import { Injectable, Output, EventEmitter } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';
import { environment } from '@env/environment';

import { ApiService } from '@services/api.service';
import { IError } from '@interfaces/response.interface';
import { ENavigation } from '@enums/navigation.enum';

declare var gtag: any;

@Injectable({
  providedIn: 'root'
})
export class AppService {

  @Output() navigation: EventEmitter<ENavigation> = new EventEmitter();
  @Output() search: EventEmitter<boolean> = new EventEmitter();

  constructor(
    private titleService: Title,
    private metaService: Meta,
    private apiService: ApiService) { }

  setNavigation(nav: ENavigation) {
    
    this.navigation.emit(nav);

  }

  setTitle(title: string, suffix: boolean = true){

    if (suffix) title += ' - Athletics Podium';
    
    this.titleService.setTitle(title);

    this.metaService.updateTag(
      { name: 'twitter:title', content: title },
      `name='twitter:title'`
    );

    this.metaService.updateTag(
      { property: 'og:title', content: title },
      `property='og:title'`
    );


  }

  setMeta(description: string, image?: string){
    
    this.metaService.updateTag(
      { name: 'description', content: description },
      `name='description'`
    );

    this.metaService.updateTag(
      { name: 'twitter:description', content: description },
      `name='twitter:description'`
    );

    this.metaService.updateTag(
      { property: 'og:description', content: description },
      `property='og:description'`
    );

  }

  analytics(url: string){

    gtag('config', environment.analytics.trackerId, {
      page_path: url,
    });

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
