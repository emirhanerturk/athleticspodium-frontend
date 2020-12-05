import { Component, OnInit } from '@angular/core';

import { AppService, PageService } from "@services/index";
import { IPage } from "@interfaces/models.interface";
import { IError } from '@interfaces/response.interface';

@Component({
  selector: 'app-simple-notes',
  templateUrl: './simple-notes.component.html',
  styleUrls: ['./simple-notes.component.scss']
})
export class SimpleNotesComponent implements OnInit {

  loading: boolean = true;
  error: IError | IError[];

  page: IPage = null;

  constructor(
    private appService: AppService,
    private pageService: PageService
  ) { }

  ngOnInit() {

    this.appService.setNavigation(null);
    this.appService.setTitle('Simple Notes');
    this.appService.setMeta('These are the rules and simply notes to using in our database.');

    this.getPage();

  }

  async getPage(){

    this.loading = true;

    const res = await this.pageService.Get('simple-notes');
    if (res.success){
      this.page = res.data;
    } else {
      this.error = res.error;
    }

    this.loading = false;

  }

}
