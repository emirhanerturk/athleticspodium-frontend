import { Component, OnInit } from '@angular/core';
import { environment } from "@env/environment";

import { AppService, MeetingService, MedalService, AthleteService } from "@services/index";
import { IMeeting, IAthlete, IFeaturedAthlete } from '@interfaces/models.interface';
import { ENavigation } from "@enums/navigation.enum";

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss']
})
export class IndexComponent implements OnInit {

  athletesBorns: IAthlete[];
  featuredAthletes: IFeaturedAthlete[];
  upcomingMeetings: IMeeting[];
  lastMeetings: IMeeting[];
  totalCount: number;

  mediaPath: string = `${environment.cdn.host}/${environment.cdn.media.athletes}`;

  constructor(
    private appService: AppService,
    private meetingService: MeetingService,
    private medalService: MedalService,
    private athleteService: AthleteService
  ) { }

  ngOnInit() {

    this.appService.setNavigation(ENavigation.HOME);
    this.appService.setTitle('Athletics Podium', false);
    this.appService.setMeta('Athletics Podium is an international medallist database covering track and field events. All open track, indoor and XC medals in any age groups are included.');

    this.getFeaturedAthletes();
    this.getTodaysBorns();
    this.getUpcomingMeetings();
    this.getLastMeetings();
    this.getTotalCount();

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
