import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';

import { ChampsService } from "@services/champs.service";
import { CountryService } from "@services/country.service";
import { EventService } from "@services/event.service";
import { IMedalSearch } from '@interfaces/medal-search.interface';
import { IChamps, ICountry, IEvent } from '@core/interfaces/models.interface';

@Component({
  selector: 'app-medal-search-form',
  templateUrl: './medal-search-form.component.html',
  styleUrls: ['./medal-search-form.component.scss']
})
export class MedalSearchFormComponent implements OnInit {

  @Input() direction: 'H'|'V' = 'V';
  @Input() values: any;

  champs: IChamps[] = [];
  countries: ICountry[] = [];
  events: IEvent[] = [];
  years: number[] = [];

  formError: boolean = false;
  formValues: IMedalSearch = {
    champs: '',
    country: '',
    event: '',
    year: '',
    gender: '',
    medal: '',
  };

  constructor(
    private router: Router,
    private champsService: ChampsService,
    private countryService: CountryService,
    private eventService: EventService) {
    
    for (let i = new Date().getFullYear(); i > 1919; i--) {
      this.years.push(i);
    }

  }

  ngOnInit() {

    this.getFormOptions();

    if (this.values){
      this.formValues = { ...this.values };
    }

  }

  async getFormOptions(){

    const res1 = await this.champsService.List(['id', 'name'], 'name');
    if (res1.success){
      this.champs = res1.data.rows;
    }
    const res2 = await this.countryService.List(['id', 'code']);
    if (res2.success){
      this.countries = res2.data.rows;
    }
    const res3 = await this.eventService.List();
    if (res3.success){
      this.events = res3.data.rows;
    }

  }

  formSubmit(form: NgForm){

    if (form.value.champs === '' && form.value.country === ''){
      this.formError = true;
      return false;
    }

    this.formError = false;
    this.router.navigate(['/medals/search', form.value])

  }

}
