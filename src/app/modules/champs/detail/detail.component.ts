import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { AppService, ENavigation } from "@services/app.service";
import { ChampsService } from "@services/champs.service";
import { MeetingService } from "@services/meeting.service";

import { IBreadcrumb } from '@interfaces/breadcrumb.interface';
import { IChamps, IMeeting } from "@interfaces/models.interface";

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})
export class DetailComponent implements OnInit {

  loading: boolean = true;
  loading_meeting: boolean = true;
  error: any;
  first_loaded: boolean = false;
  breadcrumbs: IBreadcrumb[];

  champs: IChamps;
  meeting: IMeeting;
  meeting_events: any[];
  champs_countries: any[];
  meeting_countries: any[];

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
      if (!this.first_loaded){
        this.first_loaded = true;
        await this.getChamps(data.champ_slug);
        await this.getMeeting(data.meeting_slug);
      } else {
        this.first_loaded = true;
        this.getMeeting(data.meeting_slug);
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

      this.appService.setTitle(this.champs.name);
      this.breadcrumbs = [
        { name: 'Champs', uri: `/champs` },
        { name: this.champs.name, uri: `/champs/${this.champs.slug}` },
      ];

      this.getChampsTotals();

    } else {
      this.error = res.error
    }

    this.loading = false;

  }

  async getMeeting(meeting_slug: string){

    this.loading_meeting = true;

    if (meeting_slug){


      this.meeting = this.champs.meetings.find(item => item.slug === meeting_slug);

      this.appService.setTitle(this.meeting.name);
      this.breadcrumbs = [
        { name: 'Champs', uri: `/champs` },
        { name: this.champs.name, uri: `/champs/${this.champs.slug}` },
        { name: this.meeting.name, uri: `/champs/${this.champs.slug}/${this.meeting.slug}` },
      ];

      const res = await this.meetingService.GetMedals(this.meeting.id, 0);
      if (res.success){
        this.meeting_events = res.data;

        this.getMeetingTotals();

      } else {
        this.error = res.error;
      }

    }

    this.loading_meeting = false;
    
  }

  async getChampsTotals(){

    const res = await this.champsService.GetCounts(this.champs.id);
    if (res){
      this.champs_countries = res.data;
    }

  }

  async getMeetingTotals(){

    const res = await this.meetingService.GetCounts(this.meeting.id);
    if (res){
      this.meeting_countries = res.data;
    }
    
  }

}
