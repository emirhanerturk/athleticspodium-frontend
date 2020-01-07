import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { AppService, ENavigation } from "@services/app.service";
import { CountryService } from "@services/country.service";

import { ICountry } from "@interfaces/models.interface";

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})
export class DetailComponent implements OnInit {

  loading: boolean = true;
  error: any;

  country_code: string;
  country: ICountry;
  medals: any[];
  top_athletes: any[];

  constructor(
    private route: ActivatedRoute,
    private appService: AppService,
    private countryService: CountryService,
  ) { }

  async ngOnInit() {

    this.appService.setNavigation(ENavigation.COUNTRIES);

    this.country_code = this.route.snapshot.paramMap.get('code');

    const res = await this.countryService.GetCountry(this.country_code);
    if (res.success){
      this.country = res.data;

      this.appService.setTitle(this.country.name || this.country.code);

      const res2 = await this.countryService.GetMedals(this.country_code);
      if (res2.success){
        this.medals = res2.data;
      } else {
        // Necessary error
      }

      const res3 = await this.countryService.GetTopAthletes(this.country_code);
      if (res3.success){
        this.top_athletes = res3.data;
      } else {
        // Necessary error
      }

    } else {
      this.error = res.error;
    }

    this.loading = false;
    
  }

}
