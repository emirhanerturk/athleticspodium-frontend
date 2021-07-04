import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ENavigation } from '@enums/index';
import { AppService } from '@services/index';

import { ArticleService } from '@services/article.service';
import { Article } from '@models/article.model';
import { IBreadcrumb } from '@interfaces/breadcrumb.interface';
import { environment } from '@env/environment';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})
export class DetailComponent implements OnInit {

  loading = true;
  error: any;
  breadcrumbs: IBreadcrumb[];

  mediaPath = `${environment.cdn.host}/${environment.cdn.media.articles}/`;

  articleId: number;
  article: Article;

  latestArticles: Article[] = [];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private appService: AppService,
    private articleService: ArticleService
  ) { }

  ngOnInit(): void {

    this.appService.setNavigation(ENavigation.ARTICLES);

    this.route.params.subscribe(params => {
      this.articleId = Number(params.id);
      this.getArticle();
    });

    this.getLatest();

  }

  async getArticle(): Promise<void> {

    this.article = null;
    this.loading = true;
    this.error = null;

    const res = await this.articleService.Get(this.articleId);
    if (res.data){

      this.article = new Article().deserialize(res.data);

      this.appService.setTitle(`${this.article.title}`);
      this.appService.setMeta(`${this.article.description}`);

      this.breadcrumbs = [
        { name: 'Articles', uri: `/article` },
        { name: this.article.title, uri: `/article/${this.article.id}/${this.article.slug}` },
      ];

    } else if (res.success){
      this.router.navigateByUrl('/404');
    } else {
      this.error = res.error;
    }

    this.loading = false;

  }

  async getLatest(): Promise<void> {

    const res = await this.articleService.List({}, 10);
    if (res.success){
      this.latestArticles = res.data.rows;
    }

  }

}
