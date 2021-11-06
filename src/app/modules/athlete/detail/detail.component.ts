import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from "@env/environment";

import { AppService, AthleteService } from "@services/index";
import { IBreadcrumb, IAthlete, IMedal, IRelatedAthlete } from '@interfaces/index';
import { ENavigation } from "@enums/navigation.enum";
import { Article } from '@models/article.model';
import { ArticleService } from '@services/article.service';

@Component({
  selector: "app-detail",
  templateUrl: "./detail.component.html",
  styleUrls: ["./detail.component.scss"],
})
export class DetailComponent implements OnInit {
  loading: boolean = true;
  error: any;
  breadcrumbs: IBreadcrumb[];

  athleteId: number;
  athlete: IAthlete;
  relateds: IRelatedAthlete[] = [];
  medals: IMedal[] = [];
  medals_counts: any;
  medals_counts_total = { gold: 0, silver: 0, bronze: 0, total: 0 };
  olympians: IMedal[];
  articles: Article[] = [];

  mediaPath: string = `${environment.cdn.host}/${environment.cdn.media.athletes}`;

  showPicture: number = null;
  expandBio: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private appService: AppService,
    private athleteService: AthleteService,
    private articleService: ArticleService
  ) {}

  ngOnInit() {
    this.appService.setNavigation(ENavigation.ATHLETES);

    this.route.params.subscribe((params) => {
      this.athleteId = Number(params.id);
      this.getAthlete();
    });
  }

  async getAthlete() {
    this.loading = true;
    this.error = null;

    const res = await this.athleteService.GetAthlete(this.athleteId);
    if (res.success && res.data) {
      this.athlete = res.data;

      this.appService.setTitle(
        `${this.athlete.first_name} ${this.athlete.last_name}`
      );
      this.appService.setMeta(
        `This page is containing career information about international athlete ${this.athlete.first_name} ${this.athlete.last_name} (${this.athlete.country_code}).`
      );

      this.breadcrumbs = [
        { name: "Athletes", uri: `/athlete` },
        {
          name: `${this.athlete.first_name} ${this.athlete.last_name} (${this.athlete.country_code})`,
          uri: `/athlete/${this.athlete.id}/${this.athlete.slug}`,
        },
      ];

      this.getMedals();
      this.getRelatedAthletes();
      this.getArticles();
    } else if (res.success) {
      this.router.navigateByUrl("/404");
    } else {
      this.error = res.error;
    }

    this.loading = false;
  }

  async getMedals(): Promise<void> {
    const res = await this.athleteService.GetAthleteAllMedals(this.athleteId);
    if (res.success) {
      this.medals = res.data;
      this.calculateMedalsCounts(res.data);
      this.fetchOlympians();
    }
  }

  fetchOlympians(): void {
    this.olympians = this.medals.filter((m) => m.champ_id === 40);
    console.log(this.medals);
    console.log(this.olympians);
  }

  calculateMedalsCounts(medals: IMedal[]): void {
    let counts = {};

    medals.forEach((item) => {
      if (item.is_canceled === false) {
        if (counts[item.champ_id] === undefined) {
          counts[item.champ_id] = item.champ;
          counts[item.champ_id].medals = {
            gold: 0,
            silver: 0,
            bronze: 0,
            total: 0,
          };
        }

        switch (item.medal) {
          case 1:
            counts[item.champ_id].medals.gold++;
            this.medals_counts_total.gold++;
            break;
          case 2:
            counts[item.champ_id].medals.silver++;
            this.medals_counts_total.silver++;
            break;
          case 3:
            counts[item.champ_id].medals.bronze++;
            this.medals_counts_total.bronze++;
            break;
        }
        counts[item.champ_id].medals.total++;
        this.medals_counts_total.total++;
      }
    });

    let counts_obj = Object.values(counts);
    counts_obj = counts_obj.sort((a: any, b: any) => {
      if (a.rank > b.rank) return 1;
      if (a.rank < b.rank) return -1;
      // if(a.medals.gold > b.medals.gold) return -1;
      // if(a.medals.gold < b.medals.gold) return 1;
      // if(a.medals.silver > b.medals.silver) return -1;
      // if(a.medals.silver < b.medals.silver) return 1;
      // if(a.medals.bronze > b.medals.bronze) return -1;
      // if(a.medals.bronze < b.medals.bronze) return 1;
      return 0;
    });

    this.medals_counts = counts_obj;
  }

  async getRelatedAthletes(): Promise<void> {
    const res = await this.athleteService.GetRelatedAthletes(this.athleteId);
    if (res.success) {
      this.relateds = res.data;
    }
  }

  async getArticles(): Promise<void> {
    const res = await this.articleService.List({ athlete: this.athleteId }, 5);
    if (res.success) {
      this.articles = res.data.rows;
    }
  }
}
