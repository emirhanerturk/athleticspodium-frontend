import { Component, OnInit } from '@angular/core';

import { AppService } from "@services/app.service";
import { ENavigation } from "@enums/navigation.enum";
import { ArticleService } from '@services/article.service';
import { Article } from '@models/article.model';
import { environment } from '@env/environment';
import { WindowScroll } from '@services/util.service';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss']
})
export class IndexComponent implements OnInit {

  featured: Article[] = [];
  articles: Article[] = [];

  page = 1;
  pageSize = 12;
  total = 0;

  mediaPath = `${environment.cdn.host}/${environment.cdn.media.articles}/`;

  constructor(
    private appService: AppService,
    private articleService: ArticleService
  ) { }

  ngOnInit(): void {

    this.appService.setNavigation(ENavigation.ARTICLES);
    this.appService.setTitle('Articles');
    this.appService.setMeta('You can read here about athletics history, championship reviews, detailed reports.');

    this.getArticles();

  }

  async getArticles(): Promise<void> {

    const limit = this.pageSize;
    const offset = this.pageSize * (this.page - 1);

    const res = await this.articleService.List({}, limit, offset);
    if (res.success){
      this.total = res.data.count;
      this.articles = res.data.rows;
    }

  }

  onChangePage(page: number): void {
    this.page = page;
    this.getArticles();
    WindowScroll();
  }

}
