import { Component, OnInit, Renderer2 } from '@angular/core';
import { environment } from '@env/environment';

import { AppService } from "@services/app.service";
import { ENavigation } from '@enums/navigation.enum';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  env = environment;
  ENavigation = ENavigation;

  activeNav: ENavigation = ENavigation.HOME;
  mobileMenuOpened: boolean = false;

  constructor(
    private appService: AppService,
    private renderer: Renderer2
  ) { }

  ngOnInit() {

    this.appService.navigation.subscribe((nav: ENavigation) => {
      this.activeNav = nav;
    });

  }

  openSearch(){
    this.appService.openSearch();
  }

  mobileMenuToggler(open?: boolean){

    if (typeof open === 'undefined'){
      open = !this.mobileMenuOpened;
    }

    if (open){
      this.mobileMenuOpened = true;
      this.renderer.addClass(document.body, 'fixed-body');
    } else {
      this.mobileMenuOpened = false;
      this.renderer.removeClass(document.body, 'fixed-body');
    }

  }

}
