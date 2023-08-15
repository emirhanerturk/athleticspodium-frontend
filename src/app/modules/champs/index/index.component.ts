import { Component, OnInit } from '@angular/core';

import { AppService, ChampsService } from '@services/index';
import { IError } from '@interfaces/index';
import { ENavigation, ICategoryInfo } from '@enums/index';
import { Champ } from '@models/champ.model';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss'],
})
export class IndexComponent implements OnInit {
  loading: boolean = true;
  error: IError | IError[];

  categories: ICategoryInfo[];
  champs: Champ[] = [];
  filteredChamps: Champ[] = [];
  activeCategory: number = 0;

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
      this.champs = res.data.rows;
      this.setActiveCategory(0);
    } else {
      this.error = res.error;
    }

    this.loading = false;
  }

  setActiveCategory(id: string | number) {
    this.activeCategory = Number(id);
    this.filteredChamps = this.champs.filter(
      (c) => c.category === this.activeCategory
    );
  }
}
