import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { AppService, CountryService } from "@services/index";
import { IBreadcrumb, ICountry } from '@interfaces/index';
import { ENavigation } from '@enums/navigation.enum';
import { Article } from '@models/article.model';
import { ArticleService } from '@services/article.service';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})
export class DetailComponent implements OnInit {

  loading: boolean = false;
  error: any;
  breadcrumbs: IBreadcrumb[];

  country_code: string;
  country: ICountry;
  medals: any[];
  medals_counts: any;
  top_athletes: any[];

  articles: Article[] = [];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private appService: AppService,
    private countryService: CountryService,
    private articleService: ArticleService,
  ) { }

  async ngOnInit() {

    this.appService.setNavigation(ENavigation.COUNTRIES);

    this.route.params.subscribe(params => {

      this.country_code = params.code;
      this.getCountry();

    });

  }

  async getCountry(){

    this.loading = true;

    const res = await this.countryService.GetCountry(this.country_code);
    if (res.success && res.data){
      this.country = res.data;

      this.appService.setTitle(this.country.name);
      this.appService.setMeta(`This page is containing all international championship medals in athletics for ${this.country.name} (${this.country.code}).`);

      this.breadcrumbs = [
        { name: 'Countries', uri: `/country` },
        { name: `${this.country.name} (${this.country.code})`, uri: `/country/${this.country.code}` },
      ];

      const res2 = await this.countryService.GetMedals(this.country_code);
      if (res2.success){
        this.medals = res2.data;

        this.medals_counts = {
          gold: 0,
          silver: 0,
          bronze: 0,
          total: 0,
        };

        this.medals.forEach(m => {
          this.medals_counts.gold += Number(m.gold);
          this.medals_counts.silver += Number(m.silver);
          this.medals_counts.bronze += Number(m.bronze);
          this.medals_counts.total += Number(m.total);
        })

      }

      const res3 = await this.countryService.GetAthletes(this.country_code, 10);
      if (res3.success){
        this.top_athletes = res3.data;
      }

      this.getArticles();

    } else if (res.success){
      this.router.navigateByUrl('/404');
    } else {
      this.error = res.error || true;
    }

    this.loading = false;

  }

  async getArticles(){

    const res = await this.articleService.List({ country: this.country_code }, 10);
    if (res.success){
      this.articles = res.data.rows;
    }

  }

}
