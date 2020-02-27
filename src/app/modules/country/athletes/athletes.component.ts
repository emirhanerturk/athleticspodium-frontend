import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { AppService, ENavigation } from "@services/app.service";
import { CountryService } from "@services/country.service";
import { ArrayPaginate, WindowScroll } from "@services/util.service";

import { IBreadcrumb } from '@interfaces/breadcrumb.interface';
import { ICountry } from '@interfaces/models.interface';

@Component({
  selector: 'app-athletes',
  templateUrl: './athletes.component.html',
  styleUrls: ['./athletes.component.scss']
})
export class AthletesComponent implements OnInit {

  loading: boolean = true;
  error: any;
  breadcrumbs: IBreadcrumb[];

  country_code: string;
  country: ICountry;
  athletes: any[];
  private _all_athletes: any[];

  count: number = 0;
  page: number = 1;
  pageSize: number = 25;
  searchKey: string = null;

  constructor(
    private route: ActivatedRoute,
    private appService: AppService,
    private countryService: CountryService,
  ) { }

  ngOnInit() {

    this.appService.setNavigation(ENavigation.COUNTRIES);

    this.country_code = this.route.snapshot.paramMap.get('code');

    this.getCountry();

    this.getAthletes();

  }

  async getCountry(){

    const res = await this.countryService.GetCountry(this.country_code);
    if (res.success){
      this.country = res.data;

      this.appService.setTitle(`${this.country.name}'s All Athletes`);
      this.breadcrumbs = [
        { name: 'Countries', uri: `/country` },
        { name: `${this.country.name} (${this.country.code})`, uri: `/country/${this.country.code}` },
        { name: 'Athletes', uri: `/country/${this.country.code}/athletes` },
      ];

      this.loading = false;
    
    } else {
      // Important error
    }

  }

  async getAthletes(){

    const res = await this.countryService.GetAthletes(this.country_code);
    if (res.success){
      
      this._all_athletes = res.data;
      this.count = res.data.length;

      this.pagination();

    } else {
      // Necessary error
    }

  }

  changedPage(page: number){

    this.page = page;

    WindowScroll()

    this.pagination();

  }

  pagination(){

    this.athletes = ArrayPaginate(this._all_athletes, this.pageSize, this.page)

  }

  search(e: any){

    let value = e.target.value.trim();
    if (value && value.length > 2){
      this.searchKey = value;
      value = value.toLowerCase();
      this.athletes = this._all_athletes.filter(a => {
        const n = a.athlete.first_name + ' ' + a.athlete.last_name;
        return n.toLowerCase().indexOf(value) !== -1
      })
    } else {
      this.searchKey = null;
      this.page = 1;
      this.pagination();
    }

  }

}
