import { Component, OnInit } from '@angular/core';

import { AppService, ENavigation } from "@services/app.service";
import { MeetingService } from "@services/meeting.service";
import { IMeeting } from '@core/interfaces/models.interface';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss']
})
export class IndexComponent implements OnInit {

  lastMeetings: any[];

  constructor(
    private appService: AppService,
    private meetingService: MeetingService
  ) { }

  ngOnInit() {

    this.appService.setNavigation(ENavigation.HOME);
    this.appService.setTitle('Athletics Podium', false);

    this.getLastMeetings();

  }

  async getLastMeetings(){

    const res = await this.meetingService.GetLastMeetings();
    if (res.success){
      this.lastMeetings = res.data;
    }

  }

}
