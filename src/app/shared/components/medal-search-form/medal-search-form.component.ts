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

  loadingChamps: boolean = true;
  loadingCountries: boolean = true;
  loadingEvents: boolean = true;

  champs: IChamps[] = [];
  countries: ICountry[] = [];
  events: IEvent[] = [];
  years: number[] = [];

  allChamps: IChamps[] = [];
  allCountries: ICountry[] = [];
  allEvents: IEvent[] = [];

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

    const res1 = await this.champsService.List(['id', 'name', 'category', 'events'], 'name');
    if (res1.success){
      this.champs = res1.data.rows;
      this.allChamps = res1.data.rows;
      this.loadingChamps = false;
    }
    const res2 = await this.countryService.List(null, ['code', 'name', 'categories']);
    if (res2.success){
      this.countries = res2.data.rows;
      this.allCountries = res2.data.rows;
      this.loadingCountries = false;
    }
    const res3 = await this.eventService.List();
    if (res3.success){
      this.events = res3.data.rows;
      this.allEvents = res3.data.rows;
      this.loadingEvents = false;
    }

  }

  changeChamps(){
    
    if (this.formValues.champs){
      const champ = this.allChamps.find(i => i.id === parseInt(this.formValues.champs));
      this.countries = this.allCountries.filter(i => i.categories.includes(champ.category));
      this.events = this.allEvents.filter(i => champ.events.includes(i.id));
    } else {
      this.countries = this.allCountries;
      this.events = this.allEvents;
    }

  }

  changeCountry(){

    if (!this.formValues.champs){

      if (this.formValues.country){
        const country = this.allCountries.find(i => i.code === this.formValues.country);
        this.champs = this.allChamps.filter(i => country.categories.includes(i.category));  
      } else {
        this.champs = this.allChamps;
      }

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