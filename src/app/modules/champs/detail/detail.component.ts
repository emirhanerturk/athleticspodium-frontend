import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { AppService, ENavigation } from "@services/app.service";
import { ChampsService } from "@services/champs.service";
import { MeetingService } from "@services/meeting.service";

import { IChamps, IMeeting } from "@interfaces/models.interface";

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})
export class DetailComponent implements OnInit {

  loading: boolean = true;
  loading_medals: boolean = true;
  error: any;
  firstLoaded: boolean = false;

  champs: IChamps;
  meeting: IMeeting;
  meeting_events: any[];
  champs_countries: any[];

  Math = Math;

  constructor(
    private route: ActivatedRoute,
    private appService: AppService,
    private champsService: ChampsService,
    private meetingService: MeetingService,
    ) {

    }

  ngOnInit() {

    this.appService.setNavigation(ENavigation.CHAMPS)

    this.route.params.subscribe(async data => {
      if (!this.firstLoaded){
        this.firstLoaded = true;
        await this.getChamps(data.slug);
        await this.getMedals(data.id);
      } else {
        this.firstLoaded = true;
        this.getMedals(data.id);
      }
    })

  }

  async getChamps(champs_slug: string){

    this.loading = true;

    this.champs = null;
    this.meeting = null;

    const res = await this.champsService.GetChamps(champs_slug);
    if (res.success){
      this.champs = res.data;

      const res2 = await this.champsService.GetCountsGroupByCountry(this.champs.id);
      if (res2){
        this.champs_countries = res2.data;
      }

    } else {
      this.error = res.error
    }

    setTimeout(() => {
      this.loading = false;        
    }, 1000);

  }

  async getMedals(meeting_id: number){
    
    this.loading_medals = true;

    if (meeting_id){

      this.meeting = this.champs.meetings.filter(item => item.id == meeting_id)[0];

      const res = await this.meetingService.GetMedals(meeting_id);
      if (res.success){
        this.meeting_events = res.data;
      } else {
        this.error = res.error;
      }

    }

    setTimeout(() => {
      this.loading_medals = false;        
    }, 1000);
    
  }

}
