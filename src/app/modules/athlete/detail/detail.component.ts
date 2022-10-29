import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from "@env/environment";

import { AppService, AthleteService } from "@services/index";
import { IBreadcrumb, IAthlete, IMedal, IRelatedAthlete } from '@interfaces/index';
import { ENavigation } from "@enums/navigation.enum";
import { Article } from '@models/article.model';
import { ArticleService } from '@services/article.service';
import { Meeting } from '@models/meeting.model';
import { EMedal } from '@enums/medal.enum';
import { ECategory } from '@enums/category.enum';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss'],
})
export class DetailComponent implements OnInit {
  loading: boolean = true;
  error: any;
  breadcrumbs: IBreadcrumb[];

  athleteId: number;
  athlete: IAthlete;
  relateds: IRelatedAthlete[] = [];
  medals: IMedal[] = [];
  medalsNationals: IMedal[] = [];
  medalsCount: any;
  medalsCountTotals = { gold: 0, silver: 0, bronze: 0, total: 0 };
  articles: Article[] = [];
  olympians: Meeting[] = [];

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
        { name: 'Athletes', uri: `/athlete` },
        {
          name: `${this.athlete.first_name} ${this.athlete.last_name} (${this.athlete.country_code})`,
          uri: `/athlete/${this.athlete.id}/${this.athlete.slug}`,
        },
      ];

      this.getMedals();
      this.getRelatedAthletes();
      this.getArticles();
      this.getOlympians();
    } else if (res.success) {
      this.router.navigateByUrl('/404');
    } else {
      this.error = res.error;
    }

    this.loading = false;
  }

  async getMedals(): Promise<void> {
    const res = await this.athleteService.GetAthleteAllMedals(this.athleteId);
    if (res.success) {
      this.medals = res.data;
      this.seperateNationalsMedals();
      this.calculateMedalsCounts();
    }
  }

  seperateNationalsMedals(): void {
    this.medalsNationals = this.medals.filter(
      (m) => m.champ.category === ECategory.NATIONALS
    );
    this.medals = this.medals.filter(
      (m) => m.champ.category !== ECategory.NATIONALS
    );
  }

  calculateMedalsCounts(): void {
    const counts = {};
    this.medals.forEach((item) => {
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
          case EMedal.GOLD:
            counts[item.champ_id].medals.gold++;
            this.medalsCountTotals.gold++;
            break;
          case EMedal.SILVER:
            counts[item.champ_id].medals.silver++;
            this.medalsCountTotals.silver++;
            break;
          case EMedal.BRONZE:
            counts[item.champ_id].medals.bronze++;
            this.medalsCountTotals.bronze++;
            break;
        }
        counts[item.champ_id].medals.total++;
        this.medalsCountTotals.total++;
      }
    });

    this.medalsCount = Object.values(counts).sort((a: any, b: any) => {
      if (a.rank > b.rank) return 1;
      if (a.rank < b.rank) return -1;
      return 0;
    });
  }

  async getRelatedAthletes(): Promise<void> {
    const res = await this.athleteService.GetRelatedAthletes(this.athleteId);
    if (res.success) {
      this.relateds = res.data;
    }
  }

  async getOlympians(): Promise<void> {
    const res = await this.athleteService.GetOlympians(this.athleteId);
    if (res.success) {
      this.olympians = res.data;
    }
  }

  async getArticles(): Promise<void> {
    const res = await this.articleService.List({ athlete: this.athleteId }, 5);
    if (res.success) {
      this.articles = res.data.rows;
    }
  }
}
