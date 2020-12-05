import { Component, OnInit } from '@angular/core';

import { AppService } from "@services/app.service";
import { ENavigation } from "@enums/navigation.enum";

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss']
})
export class IndexComponent implements OnInit {

  constructor(
    private appService: AppService
  ) { }

  ngOnInit() {

    this.appService.setNavigation(ENavigation.ARTICLES);
    this.appService.setTitle('Articles');
    this.appService.setMeta('You can read here about athletics history, championship reviews, detailed reports.');

  }

}
