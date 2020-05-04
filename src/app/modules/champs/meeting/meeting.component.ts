import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ViewportScroller } from '@angular/common';

import { AppService, ENavigation } from "@services/app.service";
import { ChampsService } from "@services/champs.service";
import { MeetingService } from "@services/meeting.service";
import { IBreadcrumb } from '@interfaces/breadcrumb.interface';
import { IChamps, IMeeting } from "@interfaces/models.interface";
import { EGender } from "@enums/gender.enum";

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

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private appService: AppService,
    private champsService: ChampsService,
    private meetingService: MeetingService,
    private viewportScroller: ViewportScroller) { }

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

  async getChamps(champs_slug: string){

    this.loading = true;
    this.error = null;

    const res = await this.champsService.GetChamps(champs_slug);
    if (res.success){
      this.champs = res.data;
    } else {
      this.error = res.error;
    }

    this.loading = false;

  }

  async getMeeting(meeting_slug: string){

    this.loading_meeting = true;

    const res = await this.meetingService.GetMeeting(meeting_slug);
    if (res.success){

      this.meeting = res.data;

      this.appService.setTitle(this.meeting.name);
      this.breadcrumbs = [
        { name: 'Champs', uri: `/champs` },
        { name: this.champs.name, uri: `/champs/${this.champs.slug}` },
        { name: this.meeting.name, uri: `/champs/${this.champs.slug}/${this.meeting.slug}` },
      ];

      this.getMedals();
      this.getTotals();

    } else {
      this.error = res.error;
    }

    this.loading_meeting = false;
    
  }

  async getMedals(){

    const res = await this.meetingService.GetMedals(this.meeting.id);
    if (res.success){
      this.events = res.data;
    } else {
      this.error = res.error;
    }

  }

  async getTotals(){

    const res = await this.meetingService.GetCounts(this.meeting.id);
    if (res){
      this.totals = res.data;
    }
    
  }

  scrollToGender(gender: string) {

    this.viewportScroller.scrollToAnchor(`section-${gender}`);
  
  }

  changeMeeting(e: any){

    const value = e.target.value;
    this.router.navigateByUrl(`/champs/${this.champs.slug}/${value}`);

  }

}
