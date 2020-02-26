import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { AppService, ENavigation } from "@services/app.service";
import { CountryService } from "@services/country.service";

import { IBreadcrumb } from '@interfaces/breadcrumb.interface';
import { ICountry } from '@interfaces/models.interface';

@Component({
  selector: 'app-athletes',
  templateUrl: './athletes.component.html',
  styleUrls: ['./athletes.component.scss']
})
export class AthletesComponent implements OnInit {

  loading: boolean = false;
  error: any;
  breadcrumbs: IBreadcrumb[];

  country_code: string;
  country: ICountry;
  athletes: any[];

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
    
    } else {
      // Important error
    }

  }

  async getAthletes(){

    const res = await this.countryService.GetAthletes(this.country_code);
    if (res.success){
      this.athletes = res.data;
    } else {
      // Necessary error
    }

  }

}
