import { Component, OnInit } from '@angular/core';
import { trigger, transition, style, animate } from '@angular/animations';

import { AppService, CountryService } from "@services/index";
import { ICountry, IError } from "@interfaces/index";
import { ENavigation, ICategoryInfo } from '@enums/index';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss'],
  animations: [
    trigger(
      'fadeIn', 
      [
        transition(
          ':enter', 
          [
            style({ opacity: 0 }),
            animate('.2s ease-out', style({ opacity: 1 }))
          ]
        )
      ]
    )
  ]
})
export class IndexComponent implements OnInit {

  loading: boolean = true;
  error: IError | IError[];

  countries: ICountry[];
  private _countries: ICountry[];
  categories: ICategoryInfo[] = [];
  selectedCategory: number = null;
  searchKey: string = '';

  constructor(
    private appService: AppService,
    private countryService: CountryService
  ) { }

  ngOnInit() {

    this.appService.setNavigation(ENavigation.COUNTRIES)
    this.appService.setTitle('Countries');
    this.appService.setMeta('You can list here for all current and non-existing countries who have medals at international athletics.');

    this.categories = this.countryService.GetCategories();

    this.getCountries();

  }

  async getCountries(){

    this.loading = true;

    const res = await this.countryService.List({ is_country: 1 }, ['code', 'name', 'categories']);
    if (res.success){
      this._countries = res.data.rows
      this.countries = this._countries;
    } else {
      this.error = res.error;
    }

    this.loading = false;

  }

  filterCountries(){

    let countries = this._countries;

    if (this.selectedCategory !== null){
      countries = countries.filter(i => i.categories.includes(this.selectedCategory))
    }

    if (this.searchKey){
      const searchKey = this.searchKey.toLowerCase();
      countries = countries.filter(i => i.code.toLowerCase().indexOf(searchKey) !== -1 || i.name.toLowerCase().indexOf(searchKey) !== -1)
    }

    this.countries = countries;

  }

  search(e: any){

    const value = e.target.value;
    if (value){
      this.searchKey = value;
    } else {
      this.searchKey = null;
    }
    this.filterCountries();

  }

  selectCategory(id: number){

    if (this.selectedCategory === id){
      this.selectedCategory = null;
    } else {
      this.selectedCategory = id;
    }
    this.filterCountries();

  }

}
