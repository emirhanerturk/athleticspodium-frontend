import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { AppService, ENavigation } from "@services/app.service";
import { PlayerService } from "@services/player.service";

import { IPlayer, IMedal } from "@interfaces/models.interface";

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})
export class DetailComponent implements OnInit {

  loading: boolean = true;
  error: any;

  athlete_id: number;
  athlete: IPlayer;
  medals: IMedal[];
  medals_counts: any;

  Math = Math;

  constructor(
    private route: ActivatedRoute,
    private appService: AppService,
    private playerService: PlayerService) { }

  ngOnInit() {

    this.appService.setNavigation(ENavigation.ATHLETES);

    this.athlete_id = parseInt(this.route.snapshot.paramMap.get('id'));

    this.getAthlete(this.athlete_id);

  }

  async getAthlete(athlete_id: number){

    this.loading = true;

    const res = await this.playerService.GetPlayer(athlete_id);
    if (res.success){
      this.athlete = res.data;

      const res2 = await this.playerService.GetPlayerAllMedals(athlete_id);
      if (res2.success){
        this.medals = res2.data;

        this.calculateMedalsCounts(res2.data);

      } else {

      }

    } else {
      this.error = res.error;
    }

    console.log(this.athlete)
    console.log(this.medals)

    this.loading = false;

  }

  calculateMedalsCounts(medals: IMedal[]){

    let counts = {};

    medals.forEach(item => {

      if (item.is_canceled === false){

        console.log(item.champs_id)
        if (counts[item.champs_id] === undefined){
          counts[item.champs_id] = item.champ;
          counts[item.champs_id].medals = { golden: 0, silver: 0, bronze: 0, total: 0 };
        }
  
        switch(item.medal){
          case 1: counts[item.champs_id].medals.golden++; break;
          case 2: counts[item.champs_id].medals.silver++; break;
          case 3: counts[item.champs_id].medals.bronze++; break;
        }
        counts[item.champs_id].medals.total++;

      }

    })

    this.medals_counts = counts;
    
  }

}
