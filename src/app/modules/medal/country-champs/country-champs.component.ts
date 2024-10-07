import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IError } from '@interfaces/index';
import { IChamps } from '@interfaces/models.interface';
import { AppService } from '@services/app.service';
import { MedalService } from '@services/medal.service';

@Component({
  selector: 'app-country-champs',
  templateUrl: './country-champs.component.html',
  styleUrl: './country-champs.component.scss',
})
export class CountryChampsComponent {
  table: any = [];
  totals = {
    gold: 0,
    silver: 0,
    bronze: 0,
    total: 0,
  };

  form = {
    country: '',
    champ: '',
  };

  selectedChamp: IChamps;

  loading: boolean;
  error: IError | IError[];
  firstSearch = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private appService: AppService,
    private medalService: MedalService
  ) {}

  ngOnInit(): void {
    this.appService.setNavigation(null);
    this.appService.setTitle('Medal Countdown by Champs');
    this.appService.setMeta(
      'You can search any medal in athletics history, sorted by country, type, event, or year.'
    );

    this.route.params.subscribe((queries) => {
      if (Object.keys(queries).length) {
        this.form = { ...queries as any };
        this.searchMedals();
      }
    });
  }

  getMedals(form: any): void {
    this.form = form;
    this.router.navigate(['/medals/country-champs', form]);
  }

  async searchMedals() {
    if (!this.form.champ || !this.form.country) {
      return;
    }
    this.firstSearch = true;
    this.loading = true;
    this.error = null;

    const res = await this.medalService.CountryChamps(this.form);
    if (res.success) {
      this.table = res.data;
      this.calculateTotals();
    } else {
      this.error = res.error;
    }

    this.loading = false;
  }

  calculateTotals(): void {
    this.totals = {
      gold: 0,
      silver: 0,
      bronze: 0,
      total: 0,
    };

    this.table.forEach((row) => {
      this.totals.gold += row.gold;
      this.totals.silver += row.silver;
      this.totals.bronze += row.bronze;
      this.totals.total += row.total;
    });
  }
}
