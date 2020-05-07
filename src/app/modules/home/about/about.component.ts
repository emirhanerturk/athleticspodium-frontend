import { Component, OnInit } from '@angular/core';
import { environment } from '../../../../environments/environment';

import { AppService, ENavigation } from "@services/app.service";

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit {

  env = environment;
  
  showPicture: number;

  constructor(
    private appService: AppService
  ) { }

  ngOnInit() {

    this.appService.setNavigation(ENavigation.ABOUT);
    this.appService.setTitle('About');
    this.appService.setMeta('This page about Athleticspodium.com project and collaborators.');
    
  }

}
