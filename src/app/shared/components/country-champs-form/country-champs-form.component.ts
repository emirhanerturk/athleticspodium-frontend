import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ECategory } from '@enums/index';
import { IChamps, ICountry } from '@interfaces/models.interface';
import { ChampsService, CountryService } from '@services/index';

@Component({
  selector: 'app-country-champs-form',
  templateUrl: './country-champs-form.component.html',
  styleUrl: './country-champs-form.component.scss',
})
export class CountryChampsFormComponent {
  @Input() vertical = false;
  @Output() search = new EventEmitter();
  @Output() selectedChamp = new EventEmitter();

  champs: IChamps[] = [];
  allChamps: IChamps[] = [];

  countries: ICountry[] = [];
  allCountries: ICountry[] = [];

  form = {
    country: '',
    champ: '',
  };

  constructor(
    private route: ActivatedRoute,
    private countryService: CountryService,
    private champsService: ChampsService
  ) {}

  ngOnInit(): void {
    this.getFormOptions();

    this.route.params.subscribe((queries) => {
      if (Object.keys(queries).length) {
        this.form = { ...this.form, ...queries };
        this.formValuesChanges();
        this.search.emit(this.form);
      }
    });
  }

  async getFormOptions(): Promise<void> {
    const resCountry = await this.countryService.List(
      { is_country: 1 },
      ['code', 'name'],
      'name'
    );
    if (resCountry.success) {
      this.countries = resCountry.data.rows as ICountry[];
      this.allCountries = resCountry.data.rows as ICountry[];
    }

    const resChamp = await this.champsService.List(
      ['id', 'slug', 'name', 'countries'],
      'name'
    );
    if (resChamp.success) {
      this.champs = resChamp.data.rows as IChamps[];
      this.allChamps = resChamp.data.rows as IChamps[];
    }

    this.formValuesChanges();
  }

  formValuesChanges(): void {
    if (this.form.country) {
      this.champs = this.allChamps.filter(
        (c) =>
          c.countries.includes(this.form.country) ||
          c.category === ECategory.UNIVERSAL
      );
    } else {
      this.champs = this.allChamps;
    }
    if (this.form.champ) {
      const champ = this.allChamps.find(
        (c) => c.id === Number(this.form.champ)
      );
      this.selectedChamp.emit(champ);
      if (!champ) {
        return;
      }
      if (champ.countries.length) {
        this.countries = this.allCountries.filter((c) =>
          champ.countries.includes(c.code)
        );
      } else {
        this.countries = this.allCountries;
      }
    } else {
      this.countries = this.allCountries;
    }
  }

  getMedals(): void {
    this.search.emit(this.form);
  }
}
