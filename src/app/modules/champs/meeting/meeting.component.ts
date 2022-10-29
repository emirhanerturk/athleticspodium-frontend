import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ViewportScroller } from '@angular/common';

import { AppService, ChampsService, MeetingService } from "@services/index";
import { IBreadcrumb, IChamps, IMeeting } from '@interfaces/index';
import { ENavigation, EGender, ECategory } from "@enums/index";
import { Article } from '@models/article.model';
import { ArticleService } from '@services/article.service';

@Component({
  selector: 'app-meeting',
  templateUrl: './meeting.component.html',
  styleUrls: ['./meeting.component.scss']
})
export class MeetingComponent implements OnInit {

  loading: boolean = true;
  loading_meeting: boolean = true;
  error: any;
  breadcrumbs: IBreadcrumb[];
  firstLoad: boolean = false;
  EGender = EGender;

  champs: IChamps;
  meeting: IMeeting;
  events: any[];
  totals: any[];
  articles: Article[] = [];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private appService: AppService,
    private champsService: ChampsService,
    private meetingService: MeetingService,
    private articleService: ArticleService,
    private viewportScroller: ViewportScroller
  ) { }

  async ngOnInit() {

    this.appService.setNavigation(ENavigation.CHAMPS);

    this.route.params.subscribe(async data => {
      if(this.firstLoad){
        await this.getMeeting(data.meeting_slug);
      } else {
        await this.getChamps(data.champ_slug);
        await this.getMeeting(data.meeting_slug);
        this.firstLoad = true;
      }
    });

  }

  async getChamps(slug: string){
    this.loading = true;
    this.error = null;

    const res = await this.champsService.GetChamps(slug);
    if (res.success) {
      this.champs = res.data;
    } else {
      this.error = res.error;
    }

    this.loading = false;
  }

  async getMeeting(slug: string){
    this.loading_meeting = true;

    const res = await this.meetingService.GetMeeting(slug);
    if (res.success){

      this.meeting = res.data;

      this.appService.setTitle(this.meeting.name);
      this.appService.setMeta(`You can find here all distributed medals in ${this.meeting.name}.`);

      this.breadcrumbs = [
        { name: 'Champs', uri: `/champs` },
        { name: this.champs.name, uri: `/champs/${this.champs.slug}` },
        { name: this.meeting.name, uri: `/champs/${this.champs.slug}/${this.meeting.slug}` },
      ];

      await this.getMedals();
      this.getTotals();
      this.getArticles();

    } else {
      this.error = res.error;
    }

    this.loading_meeting = false;

  }

  async getMedals() {
    const res = await this.meetingService.GetMedals(this.meeting.id);
    if (res.success) {
      this.events = res.data;
    } else {
      this.error = res.error;
    }
  }

  async getTotals() {
    if (this.champs.category === ECategory.NATIONALS) {
      return;
    }

    const res = await this.meetingService.GetCounts(this.meeting.id);
    if (res) {
      this.totals = res.data;
    }
  }

  async getArticles() {
    const res = await this.articleService.List({ meeting: this.meeting.id }, 5);
    if (res.success) {
      this.articles = res.data.rows;
    }
  }

  scrollToGender(gender: string) {
    this.viewportScroller.scrollToAnchor(`section-${gender}`);
  }

  changeMeeting(slug: string){
    this.router.navigateByUrl(`/champs/${this.champs.slug}/${slug}`);
  }

}
