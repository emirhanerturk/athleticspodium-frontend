import { Component, OnInit } from '@angular/core';

import { AppService, ENavigation } from "@services/app.service";

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit {

  constructor(
    private appService: AppService
  ) { }

  ngOnInit() {

    this.appService.setNavigation(ENavigation.ABOUT);
    this.appService.setTitle('About');

  }

}
