import { Component, OnInit } from '@angular/core';

import { AppService, ENavigation } from "@services/app.service";
import { ChampsService } from "@services/champs.service";

import { IChamps } from "@interfaces/models.interface";

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss']
})
export class IndexComponent implements OnInit {

  loading: boolean = true;
  error: any;

  categories: any[];

  constructor(
    private appService: AppService,
    private champsService: ChampsService
    ) { }

  ngOnInit() {

    this.appService.setNavigation(ENavigation.CHAMPS)
    this.appService.setTitle('Champs');

    this.getCategories();
    this.getChamps();

  }

  async getChamps(){

    this.loading = true;

    const res = await this.champsService.List();
    if (res.success){
      const champs = res.data.rows;

      this.categories.map(category => {
        category.champs = champs.filter(i => i.category === category.id);
        return category;
      })

    } else {
      this.error = res.error;
    }

    this.loading = false;

  }

  getCategories(){

    this.categories = this.champsService.GetCategories();

  }

}
