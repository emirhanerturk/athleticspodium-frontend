import { Component, OnInit } from '@angular/core';

import { AppService, ENavigation } from "@services/app.service";

@Component({
  selector: 'app-simple-notes',
  templateUrl: './simple-notes.component.html',
  styleUrls: ['./simple-notes.component.scss']
})
export class SimpleNotesComponent implements OnInit {

  constructor(
    private appService: AppService
  ) { }

  ngOnInit() {

    this.appService.setNavigation(null);
    this.appService.setTitle('Simple Notes');

  }

}
