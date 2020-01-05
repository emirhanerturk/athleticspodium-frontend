import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { AppService, ENavigation } from "@services/app.service";
import { AthleteService } from "@services/athlete.service";

import { IAthlete, IMedal } from "@interfaces/models.interface";

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})
export class DetailComponent implements OnInit {

  loading: boolean = true;
  error: any;

  athlete_id: number;
  athlete: IAthlete;
  medals: IMedal[];
  medals_counts: any;
  medals_counts_total: any;

  Math = Math;

  constructor(
    private route: ActivatedRoute,
    private appService: AppService,
    private athleteService: AthleteService) { }

  ngOnInit() {

    this.appService.setNavigation(ENavigation.ATHLETES);

    this.athlete_id = parseInt(this.route.snapshot.paramMap.get('id'));

    this.getAthlete(this.athlete_id);

  }

  async getAthlete(athlete_id: number){

    this.loading = true;

    const res = await this.athleteService.GetAthlete(athlete_id);
    if (res.success){
      this.athlete = res.data;

      this.appService.setTitle(this.athlete.first_name + ' ' + this.athlete.last_name);

      const res2 = await this.athleteService.GetAthleteAllMedals(athlete_id);
      if (res2.success){
        this.medals = res2.data;

        this.calculateMedalsCounts(res2.data);

      } else {

      }

    } else {
      this.error = res.error;
    }

    this.loading = false;

  }

  calculateMedalsCounts(medals: IMedal[]){

    let counts = {};
    let total = { golden: 0, silver: 0, bronze: 0, total: 0 };

    medals.forEach(item => {

      if (item.is_canceled === false){

        if (counts[item.champ_id] === undefined){
          counts[item.champ_id] = item.champ;
          counts[item.champ_id].medals = { golden: 0, silver: 0, bronze: 0, total: 0 };
        }
  
        switch(item.medal){
          case 1:
            counts[item.champ_id].medals.golden++;
            total.golden++;
            break;
          case 2:
            counts[item.champ_id].medals.silver++;
            total.silver++;
            break;
          case 3:
            counts[item.champ_id].medals.bronze++;
            total.bronze++;
            break;
        }
        counts[item.champ_id].medals.total++;
        total.total++;

      }

    })

    this.medals_counts = counts;
    this.medals_counts_total = total;
    
  }

}
