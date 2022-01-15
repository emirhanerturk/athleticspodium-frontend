import { Component, OnInit } from '@angular/core';

import { AppService, ChampsService } from '@services/index';
import { IChamps, IError } from '@interfaces/index';
import { ENavigation, ICategoryInfo } from '@enums/index';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss'],
})
export class IndexComponent implements OnInit {
  loading: boolean = true;
  error: IError | IError[];

  categories: ICategoryInfo[];

  constructor(
    private appService: AppService,
    private champsService: ChampsService
  ) {}

  ngOnInit(): void {
    this.appService.setNavigation(ENavigation.CHAMPS);
    this.appService.setTitle('Champs');
    this.appService.setMeta(
      'You can list here for all historic athletics events and its editions.'
    );

    this.getCategories();
    this.getChamps();
  }

  getCategories(): void {
    this.categories = this.champsService.GetCategories();
  }

  async getChamps(): Promise<void> {
    this.loading = true;

    const res = await this.champsService.List(['id', 'name', 'category']);
    if (res.success) {
      const champs = res.data.rows;

      this.categories.map((category) => {
        category.champs = champs.filter(
          (i: IChamps) => i.category === category.id
        );
        return category;
      });
    } else {
      this.error = res.error;
    }

    this.loading = false;
  }
}
