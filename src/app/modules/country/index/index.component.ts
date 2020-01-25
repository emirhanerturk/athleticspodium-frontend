import { Component, OnInit, HostListener } from '@angular/core';

import { AppService, ENavigation } from "@services/app.service";
import { CountryService } from "@services/country.service";

import { ICountry } from "@interfaces/models.interface";

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss']
})
export class IndexComponent implements OnInit {

  loading: boolean = true;
  error: any;

  countries: ICountry[];
  searchKey: string = '';

  constructor(
    private appService: AppService,
    private countryService: CountryService,
  ) { }

  ngOnInit() {

    this.appService.setNavigation(ENavigation.COUNTRIES)
    this.appService.setTitle('Countries');

    this.getCountryList();

  }

  async getCountryList(){

    this.loading = true;

    const res = await this.countryService.List();
    if (res.success){
      this.countries = res.data.rows;
    } else {
      this.error = res.error;
    }

    this.loading = false;

  }

  @HostListener('document:keydown', ['$event'])
  onKeydownHandler(event: KeyboardEvent) {
    if (event.key === 'Backspace'){
      if (this.searchKey.length) this.searchKey = this.searchKey.slice(0, -1)
    } else {
      console.log(event);
      this.searchKey += event.key;
    }
    console.log(this.searchKey);
  }

}
