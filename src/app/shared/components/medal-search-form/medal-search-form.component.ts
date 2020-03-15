import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';

import { ChampsService } from "@services/champs.service";
import { CountryService } from "@services/country.service";
import { EventService } from "@services/event.service";
import { IMedalSearch } from '@interfaces/medal-search.interface';
import { IChamps, ICountry, IEvent } from '@interfaces/models.interface';
import { ECategory } from "@core/enums/category.enum";
import { EGender } from '@core/enums/gender.enum';

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

  private _champs: IChamps[] = [];
  private _countries: ICountry[] = [];
  private _events: IEvent[] = [];
  private _years: number[] = [];

  formError: boolean = false;
  formValues: IMedalSearch = {
    champs: '',
    country: '',
    event: '',
    year: '',
    gender: '',
    medal: '',
  };

  required: { champs: boolean, country: boolean} = {
    champs: true,
    country: true
  }

  constructor(
    private router: Router,
    private champsService: ChampsService,
    private countryService: CountryService,
    private eventService: EventService) {
    
    for (let i = new Date().getFullYear(); i > 1919; i--) {
      this._years.push(i);
    }
    this.years = this._years;

  }

  async ngOnInit() {

    await this.getFormOptions();

    if (this.values){
      this.formValues = { ...this.values };
      this.formValuesChanges();
    }

  }

  async getFormOptions(){

    const res1 = await this.champsService.List(['id', 'name', 'category', 'countries', 'years', 'events_men', 'events_women', 'events_mixed'], 'name');
    if (res1.success){
      this._champs = res1.data.rows;
      this.champs = res1.data.rows;
      this.loadingChamps = false;
    }
    const res2 = await this.countryService.List(null, ['code', 'name', 'categories'], 'name');
    if (res2.success){
      this._countries = res2.data.rows;
      this.countries = res2.data.rows;
      this.loadingCountries = false;
    }
    const res3 = await this.eventService.List();
    if (res3.success){
      this._events = res3.data.rows;
      this.events = res3.data.rows;
      this.loadingEvents = false;
    }

  }

  formValuesChanges(){

    if (this.formValues.champs){
      
      const champ = this._champs.find(i => i.id === parseInt(this.formValues.champs));
      
      if (champ.countries.length){
        this.countries = this._countries.filter(i => champ.countries.includes(i.code));
      } else if (ECategory.UNIVERSAL == champ.category) {
        this.countries = this._countries;
      } else {
        this.countries = this._countries.filter(i => i.categories.includes(champ.category));
      }

      this.years = this._years.filter(i => champ.years.includes(i));

      if (!isNaN(parseInt(this.formValues.gender))){

        let field_name = '';
        switch(parseInt(this.formValues.gender)){
          case EGender.MEN: field_name = 'events_men'; break;
          case EGender.WOMEN: field_name = 'events_women'; break;
          case EGender.MIXED: field_name = 'events_mixed'; break;
        }
        this.events = this._events.filter(e => champ[field_name].includes(e.id));
  
      } else {

        const events = champ.events_men.concat(champ.events_women).concat(champ.events_mixed)
        this.events = this._events.filter(e => events.includes(e.id));

      }

    } else {
      this.countries = this._countries;

      if (this.formValues.country){
        const country = this._countries.find(i => i.code === this.formValues.country);
        this.champs = this._champs.filter(i => country.categories.includes(i.category));  
      } else {
        this.champs = this._champs;
        this.events = this._events;
      }

    }

    this.setRequires();

  }

  setRequires(){

    this.required.champs = (this.formValues.champs === '' && this.formValues.country === '') || (this.formValues.champs !== '');
    this.required.country = (this.formValues.champs === '' && this.formValues.country === '') || (this.formValues.champs === '' && this.formValues.country !== '');

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
