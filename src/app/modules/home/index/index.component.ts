import { Component, OnInit } from '@angular/core';
import { environment } from "@env/environment";

import { AppService, MeetingService, MedalService, AthleteService } from "@services/index";
import { IMeeting, IAthlete, IFeaturedAthlete } from '@interfaces/models.interface';
import { ENavigation } from "@enums/navigation.enum";
import { ArticleService } from '@services/article.service';
import { FeaturedArticle } from '@models/featured-article.model';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss']
})
export class IndexComponent implements OnInit {

  featuredArticle: FeaturedArticle;
  featuredArticles: FeaturedArticle[];
  athletesBorns: IAthlete[];
  featuredAthletes: IFeaturedAthlete[];
  upcomingMeetings: IMeeting[];
  lastMeetings: IMeeting[];
  totalCount: number;

  mediaPathArticle = `${environment.cdn.host}/${environment.cdn.media.articles}/`;
  mediaPathAthlete = `${environment.cdn.host}/${environment.cdn.media.athletes}`;

  constructor(
    private appService: AppService,
    private meetingService: MeetingService,
    private medalService: MedalService,
    private articleService: ArticleService,
    private athleteService: AthleteService
  ) { }

  ngOnInit() {

    this.appService.setNavigation(ENavigation.HOME);
    this.appService.setTitle('Athletics Podium', false);
    this.appService.setMeta('Athletics Podium is an international medallist database covering track and field events. All open track, indoor and XC medals in any age groups are included.');

    this.getFeaturedArticles();
    this.getFeaturedAthletes();
    this.getTodaysBorns();
    this.getUpcomingMeetings();
    this.getLastMeetings();
    this.getTotalCount();

  }

  async getFeaturedArticles(){

    const res = await this.articleService.GetFeaturedArticles();
    if (res.success && res.data && res.data.length){
      this.featuredArticle = res.data[0];
      this.featuredArticles = res.data.slice(1);
    }

  }

  async getFeaturedAthletes(){

    const res = await this.athleteService.GetFeaturedAthletes();
    if (res.success){
      this.featuredAthletes = res.data;
    }

  }

  async getTodaysBorns(){

    const now = new Date();
    const date_of_birth = `${now.getMonth() + 1}-${now.getDate()}`;
    const res = await this.athleteService.List({ date_of_birth }, ['country'], 'date_of_birth');
    if (res.success){
      this.athletesBorns = res.data.rows;
    }

  }

  async getUpcomingMeetings(){

    const res = await this.meetingService.GetUpcomingMeetings();
    if (res.success){
      this.upcomingMeetings = res.data;
    }

  }

  async getLastMeetings(){

    const res = await this.meetingService.GetLastMeetings();
    if (res.success){
      this.lastMeetings = res.data;
    }

  }

  async getTotalCount(){

    const res = await this.medalService.TotalCount();
    if (res.success){
      this.totalCount = res.data;
    }

  }

}
