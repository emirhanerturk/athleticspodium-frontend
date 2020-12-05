import { Component, OnInit } from '@angular/core';

import { AppService, ChampsService, ENavigation } from "@services/index";
import { IChamps } from "@interfaces/models.interface";
import { IError } from '@interfaces/response.interface';
import { ICategoryInfo } from '@enums/category.enum';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss']
})
export class IndexComponent implements OnInit {

  loading: boolean = true;
  error: IError | IError[];

  categories: ICategoryInfo[];

  constructor(
    private appService: AppService,
    private champsService: ChampsService
    ) { }

  ngOnInit() {

    this.appService.setNavigation(ENavigation.CHAMPS);
    this.appService.setTitle('Champs');
    this.appService.setMeta('You can list here for all historic athletics events and its editions.');

    this.getCategories();
    this.getChamps();

  }

  async getChamps(){

    this.loading = true;

    const res = await this.champsService.List(['id', 'name', 'category']);
    if (res.success){
      const champs = res.data.rows;

      this.categories.map(category => {
        category.champs = champs.filter((i: IChamps) => i.category === category.id);
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
