import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from "../../../../environments/environment";
import { Lightbox } from 'ngx-lightbox';

import { AppService, ENavigation } from "@services/app.service";
import { AthleteService } from "@services/athlete.service";

import { IBreadcrumb } from '@interfaces/breadcrumb.interface';
import { IAthlete, IMedal, IRelatedAthlete } from "@interfaces/models.interface";

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})
export class DetailComponent implements OnInit {

  loading: boolean = true;
  error: any;  
  breadcrumbs: IBreadcrumb[];

  athlete_id: number;
  athlete: IAthlete;
  relateds: IRelatedAthlete[] = [];
  medals: IMedal[];
  medals_counts: any;
  medals_counts_total: any;
  mediaPath: string = `${environment.cdn.host}/${environment.cdn.media.athletes}`;

  expandBio: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private lightbox: Lightbox,
    private appService: AppService,
    private athleteService: AthleteService) { }

  ngOnInit() {

    this.appService.setNavigation(ENavigation.ATHLETES);

    this.route.params.subscribe(params => {

      this.athlete_id = parseInt(params.id);
      this.getAthlete();

    });

  }

  async getAthlete(){

    this.loading = true;
    this.error = null;

    const res = await this.athleteService.GetAthlete(this.athlete_id);
    if (res.success && res.data){
      this.athlete = res.data;

      this.appService.setTitle(`${this.athlete.first_name} ${this.athlete.last_name}`);
      this.appService.setMeta(`This page is containing career information about international athlete ${this.athlete.first_name} ${this.athlete.last_name} (${this.athlete.country_code}).`);

      this.breadcrumbs = [
        { name: 'Athletes', uri: `/athlete` },
        { name: `${this.athlete.first_name} ${this.athlete.last_name} (${this.athlete.country_code})`, uri: `/athlete/${this.athlete.id}/${this.athlete.slug}` },
      ];

      const res2 = await this.athleteService.GetAthleteAllMedals(this.athlete_id);
      if (res2.success){
        this.medals = res2.data;

        this.calculateMedalsCounts(res2.data);

      }

      const res3 = await this.athleteService.GetRelatedAthletes(this.athlete_id);
      if (res3.success){
        this.relateds = res3.data;
      }
      
    } else if (res.success){
      this.router.navigateByUrl('/404');
    } else {
      this.error = res.error;
    }

    this.loading = false;

  }

  calculateMedalsCounts(medals: IMedal[]){

    let counts = {};
    let total = { gold: 0, silver: 0, bronze: 0, total: 0 };

    medals.forEach(item => {

      if (item.is_canceled === false){

        if (counts[item.champ_id] === undefined){
          counts[item.champ_id] = item.champ;
          counts[item.champ_id].medals = { gold: 0, silver: 0, bronze: 0, total: 0 };
        }
  
        switch(item.medal){
          case 1:
            counts[item.champ_id].medals.gold++;
            total.gold++;
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

    let counts_obj = Object.values(counts);
    counts_obj = counts_obj.sort((a: any, b: any) => {

      if(a.rank > b.rank) return 1;
      if(a.rank < b.rank) return -1;
      // if(a.medals.gold > b.medals.gold) return -1;
      // if(a.medals.gold < b.medals.gold) return 1;
      // if(a.medals.silver > b.medals.silver) return -1;
      // if(a.medals.silver < b.medals.silver) return 1;
      // if(a.medals.bronze > b.medals.bronze) return -1;
      // if(a.medals.bronze < b.medals.bronze) return 1;
      return 0;

    });
  
    this.medals_counts = counts_obj;
    this.medals_counts_total = total;
    
  }

  openLightbox(index: number){

    const album = this.athlete.image.map(img => ({
      src: `${this.mediaPath}/${this.athlete.id}/${img.uri}`,
      caption: `${[img.credit, img.caption].filter(img => img).join('<br>')}`,
      thumb: ''
    }))

    this.lightbox.open(album, index, { showImageNumberLabel: true });
    
  }

  toggleBio(e: Event){

    e.preventDefault();
    this.expandBio = !this.expandBio;

  }

}
