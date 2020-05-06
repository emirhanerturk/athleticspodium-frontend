import { Component, OnInit } from '@angular/core';

import { AppService, ENavigation } from "@services/app.service";
import { MeetingService } from "@services/meeting.service";
import { MedalService } from "@services/medal.service";
import { IMeeting } from '@core/interfaces/models.interface';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss']
})
export class IndexComponent implements OnInit {

  upcomingMeetings: any[];
  lastMeetings: any[];
  totalCount: number;

  constructor(
    private appService: AppService,
    private meetingService: MeetingService,
    private medalService: MedalService
  ) { }

  ngOnInit() {

    this.appService.setNavigation(ENavigation.HOME);
    this.appService.setTitle('Athletics Podium', false);
    this.appService.setMeta('Athletics Podium is an international medallist database covering track and field events. All open track, indoor and XC medals in any age groups are included.');

    this.getUpcomingMeetings();
    this.getLastMeetings();
    this.getTotalCount();

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
