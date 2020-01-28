import { Component, OnInit } from '@angular/core';

import { AppService, ENavigation } from "@services/app.service";
import { CountryService } from "@services/country.service";

import { ICountry } from "@interfaces/models.interface";
import { IError } from '@interfaces/response.interface';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss']
})
export class IndexComponent implements OnInit {

  loading: boolean = true;
  error: IError | IError[];

  countries: ICountry[];
  filteredCountries: ICountry[];
  searchKey: string = '';

  constructor(
    private appService: AppService,
    private countryService: CountryService,
  ) { }

  ngOnInit() {

    this.appService.setNavigation(ENavigation.COUNTRIES)
    this.appService.setTitle('Countries');

    this.getCountries();

  }

  async getCountries(){

    this.loading = true;

    const res = await this.countryService.List();
    if (res.success){
      this.countries = res.data.rows;
    } else {
      this.error = res.error;
    }

    this.loading = false;

  }

  filterCountries(){

    const searchKey = this.searchKey.toLowerCase();
    this.filteredCountries = this.countries.filter(i => {
      const code = i.code.toLowerCase();
      const name = i.name ? i.name.toLowerCase() : '';
      return code.indexOf(searchKey) !== -1 || name.indexOf(searchKey) !== -1
    })

  }

  search(e: any){

    const value = e.target.value;
    if (value){
      this.searchKey = value;
      this.filterCountries();
    } else {
      this.searchKey = null;
      this.filteredCountries = null;
    }

  }

}
