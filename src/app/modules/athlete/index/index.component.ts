import { Component, OnInit } from '@angular/core';

import { AppService, ENavigation } from "@services/app.service";

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss']
})
export class IndexComponent implements OnInit {

  alphabet: string[] = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"];
  selectedLetter: string = 'A';

  constructor(private appService: AppService) { }

  ngOnInit() {

    this.appService.setNavigation(ENavigation.ATHLETES)
    this.appService.setTitle('Athletes');

  }

}
