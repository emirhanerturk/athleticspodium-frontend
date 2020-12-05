import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { AppService, MeetingService } from '@services/index';
import { IMeeting } from '@interfaces/models.interface';
import { IError } from '@interfaces/response.interface';
import { ENavigation } from "@enums/navigation.enum";

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss']
})
export class IndexComponent implements OnInit {

  loading: boolean = true;
  error: IError | IError[];

  years: number[] = [];
  current_year: number = new Date().getFullYear();
  active_year: number = this.current_year;
  meetings: IMeeting[] = [];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private appService: AppService,
    private meetingService: MeetingService,
  ) {
    
    for (let i = this.current_year + 5; i > 1919; i--) {
      this.years.push(i);
    }

  }

  ngOnInit() {

    this.appService.setNavigation(ENavigation.CALENDAR);

    this.route.params.subscribe(async data => {
      
      if (data.year){
        this.active_year = parseInt(data.year);
        this.appService.setTitle(`${this.active_year} Calendar`);
        this.appService.setMeta(`You can find here international athletics calendar of ${this.active_year}.`);
      } else {
        this.appService.setTitle(`Calendar`);
        this.appService.setMeta(`You can find here all international athletics championships by dates and venues starting from very beginning.`);
      }
      
      this.getByYear();
      
    });

  }

  async getByYear(){

    this.loading = true;
    this.error = null;

    const res = await this.meetingService.List(this.active_year);
    if (res.success){
      this.meetings = res.data.rows;
    } else {
      this.error = res.error;
    }

    this.loading = false;

  }

  changeYear(event: any){

    const year = event.target.value;
    this.router.navigateByUrl(`/calendar/${year}`);

  }

}
