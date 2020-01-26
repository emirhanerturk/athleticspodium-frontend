import { Component, OnInit } from '@angular/core';

import { AppService, ENavigation } from "@services/app.service";

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss']
})
export class IndexComponent implements OnInit {

  constructor(
    private appService: AppService,
  ) { }

  ngOnInit() {

    this.appService.setNavigation(ENavigation.HOME);
    this.appService.setTitle('Athletics Podium', false);

  }

  getMedalTrackerFormOptions(){



  }

  medalTrackerSubmit(e: any){
    e.preventDefault();

  }

}
