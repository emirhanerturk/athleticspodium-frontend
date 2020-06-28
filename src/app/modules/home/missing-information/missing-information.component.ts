import { Component, OnInit } from '@angular/core';

import { AppService } from "@services/app.service";
import { PageService } from '@services/page.service';
import { IPage } from '@interfaces/models.interface';

@Component({
  selector: 'app-missing-information',
  templateUrl: './missing-information.component.html',
  styleUrls: ['./missing-information.component.scss']
})
export class MissingInformationComponent implements OnInit {

  tab: 'medallists'|'marks'|'names'|'relays' = 'medallists';

  
  loading = {
    medallists: true,
    marks: true,
    names: true,
    relays: true
  }

  error = {
    medallists: null,
    marks: null,
    names: null,
    relays: null
  }

  pages: {
    medallists: IPage,
    marks: IPage,
    names: IPage,
    relays: IPage,
  } = {
    medallists: null,
    marks: null,
    names: null,
    relays: null
  }

  constructor(
    private appService: AppService,
    private pageService: PageService
  ) { }

  ngOnInit() {

    this.appService.setNavigation(null);
    this.appService.setTitle('Missing Information');
    this.appService.setMeta('You can find here current missing information in Athleticspodium database.');

    this.changeTab('medallists');

  }

  async changeTab(tab: 'medallists'|'marks'|'names'|'relays'){

    this.tab = tab;

    if (!this.pages[tab]){
      
      this.loading[tab] = true;

      const res = await this.pageService.Get('missing-information', tab);
      if (res.success){

        let data = res.data;
        data.content = data.content.replace(/<tr><td><br><\/td>/g, '<tr><td><span></span></td>');
        this.pages[tab] = data;

      } else {
        this.error[tab] = res.error;
      }
  
      this.loading[tab] = false;

    }

  }

}
