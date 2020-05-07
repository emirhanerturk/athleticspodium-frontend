import { Component, OnInit } from '@angular/core';

import { AppService } from "@services/app.service";

@Component({
  selector: 'app-missing-information',
  templateUrl: './missing-information.component.html',
  styleUrls: ['./missing-information.component.scss']
})
export class MissingInformationComponent implements OnInit {

  tab: 'medallists'|'marks'|'names'|'relays' = 'medallists';

  constructor(
    private appService: AppService
  ) { }

  ngOnInit() {

    this.appService.setNavigation(null);
    this.appService.setTitle('Missing Information');
    this.appService.setMeta('You can find here current missing information in Athleticspodium database.');

  }

}
