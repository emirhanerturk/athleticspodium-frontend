import { Component, OnInit } from '@angular/core';
import { environment } from '@env/environment';

import { AppService, PageService } from "@services/index";
import { IPage } from "@interfaces/models.interface";
import { ENavigation } from "@enums/navigation.enum";

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit {

  env = environment;

  loading = {
    main: true,
    box: true
  }

  error = {
    main: null,
    box: null
  }

  page: {
    main: IPage;
    box: IPage;
  } = {
    main: null,
    box: null
  }
  
  showPicture: number;

  constructor(
    private appService: AppService,
    private pageService: PageService
  ) { }

  ngOnInit() {

    this.appService.setNavigation(ENavigation.ABOUT);
    this.appService.setTitle('About');
    this.appService.setMeta('This page about Athleticspodium.com project and collaborators.');

    this.getPage('main');
    this.getPage('box');
    
  }

  async getPage(section: string){

    this.loading[section] = true;

    const res = await this.pageService.Get('about', section);
    if (res.success){
      this.page[section] = res.data;
    } else {
      this.error[section] = res.error;
    }

    this.loading[section] = false;

  }

}
