import { Component, OnInit } from '@angular/core';

import { AppService } from "@services/app.service";

import { ENavigation } from '@core/enums/navigation.enum';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  ENavigation = ENavigation;

  activeNav: ENavigation = ENavigation.HOME;

  constructor(private appService: AppService) { }

  ngOnInit() {

    this.appService.navigation.subscribe((nav: ENavigation) => {
      this.activeNav = nav;
    });

  }

  openSearch(){
    this.appService.openSearch();
  }

}
