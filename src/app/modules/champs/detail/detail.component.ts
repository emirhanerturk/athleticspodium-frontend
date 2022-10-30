import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from '@env/environment';

import { AppService, ChampsService } from "@services/index";
import { IBreadcrumb, IChamps } from '@interfaces/index';
import { ENavigation } from "@enums/navigation.enum";
import { ArticleService } from '@services/article.service';
import { Article } from '@models/article.model';
import { ECategory } from '@enums/category.enum';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss'],
})
export class DetailComponent implements OnInit {
  loading = true;
  error: any;
  breadcrumbs: IBreadcrumb[];

  champs: IChamps;
  totals: any[];

  articles: Article[] = [];

  mediaPath = `${environment.cdn.host}/${environment.cdn.media.champs}`;
  champsImageError = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private appService: AppService,
    private champsService: ChampsService,
    private articleService: ArticleService
  ) {}

  ngOnInit() {
    this.appService.setNavigation(ENavigation.CHAMPS);

    this.route.params.subscribe((params) => {
      this.getChamps(params.champ_slug);
    });
  }

  async getChamps(slug: string) {
    this.loading = true;
    this.error = null;

    const res = await this.champsService.GetChamps(slug);
    if (res.success) {
      this.champs = res.data;

      this.appService.setTitle(this.champs.name);
      this.appService.setMeta(
        `This page is compiling all medals which is distributed in ${this.champs.name}.`
      );

      this.breadcrumbs = [
        { name: 'Champs', uri: `/champs` },
        { name: this.champs.name, uri: `/champs/${this.champs.slug}` },
      ];

      this.getTotals();
      this.getArticles();
    } else {
      this.error = res.error;
    }

    this.loading = false;
  }

  async getTotals(): Promise<void> {
    if (this.champs.category === ECategory.NATIONALS) {
      return;
    }

    const res = await this.champsService.GetCounts(this.champs.id);
    if (res) {
      this.totals = res.data;
    }
  }

  async getArticles(): Promise<void> {
    const res = await this.articleService.List({ champ: this.champs.id }, 5);
    if (res.success) {
      this.articles = res.data.rows;
    }
  }

  changeMeeting(slug: string): void {
    this.router.navigateByUrl(`/champs/${this.champs.slug}/${slug}`);
  }
}
