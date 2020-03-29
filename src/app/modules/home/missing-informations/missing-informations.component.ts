import { Component, OnInit } from '@angular/core';

import { AppService, ENavigation } from "@services/app.service";

@Component({
  selector: 'app-missing-informations',
  templateUrl: './missing-informations.component.html',
  styleUrls: ['./missing-informations.component.scss']
})
export class MissingInformationsComponent implements OnInit {

  constructor(
    private appService: AppService
  ) { }

  ngOnInit() {

    this.appService.setNavigation(null);
    this.appService.setTitle('Missing Informations');

  }

}
