import { Component, OnInit } from '@angular/core';

import { AppService } from "@services/app.service";

@Component({
  selector: 'app-missing-informations',
  templateUrl: './missing-informations.component.html',
  styleUrls: ['./missing-informations.component.scss']
})
export class MissingInformationsComponent implements OnInit {

  tab: 'medallist'|'marks'|'names'|'relays' = 'medallist';

  constructor(
    private appService: AppService
  ) { }

  ngOnInit() {

    this.appService.setNavigation(null);
    this.appService.setTitle('Missing Informations');

  }

}
