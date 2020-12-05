import { Component, OnInit, Renderer2 } from '@angular/core';
import { trigger, transition, style, animate } from '@angular/animations';

import { AppService } from '@services/app.service';
import { ICountry, IAthlete, IChamps } from '@interfaces/models.interface';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
  animations: [
    trigger(
      'fadeIn', 
      [
        transition(
          ':enter', 
          [
            style({ opacity: 0 }),
            animate('.3s ease-out', style({ opacity: 1 }))
          ]
        ),
        transition(
          ':leave', 
          [
            style({ opacity: 1 }),
            animate('.3s ease-in', style({ opacity: 0 }))
          ]
        )
      ]
    ),
    trigger(
      'fadeInInner', 
      [
        transition(
          ':enter', 
          [
            style({ opacity: 0 }),
            animate('.3s ease-out', style({ opacity: 1 }))
          ]
        )
      ]
    )
  ]
})
export class SearchComponent implements OnInit {

  opened: boolean = false;
  loading: boolean = false;

  athletes: IAthlete[] = [];
  countries: ICountry[] = [];
  champs: IChamps[] = [];

  key: string = '';
  popular: boolean = true;
  timeout: any;

  constructor(
    private renderer: Renderer2,
    private appService: AppService
  ) {
    
    this.countries = [{
      code: 'KEN',
      name: 'Kenya'
    },{
      code: 'JAM',
      name: 'Jamaica'
    },{
      code: 'TUR',
      name: 'Turkey'
    }];

    this.champs = [{
      id: 40,
      name: "Olympic Games",
      slug: "olympic-games"
    }, {
      id: 52,
      name: "World Championships",
      slug: "world-champs",
    }, {
      id: 18,
      name: "European Champs",
      slug: "european-champs"
    }]

  }

  ngOnInit() {

    this.appService.search.subscribe(() => {
      this.renderer.addClass(document.body, 'fixed-body');
      this.opened = true;
    });

  }

  search(e: any){

    if (this.key === e.target.value.trim()) return;

    this.key = e.target.value.trim();
    if (this.key.length > 2){

      this.loading = true;

      clearTimeout(this.timeout);
      this.timeout = setTimeout(async () => {
      
        const res = await this.appService.searchOnSite(this.key);
        if (res.success){
          this.popular = false;
          this.athletes = res.data.athletes;
          this.countries = res.data.countries;
          this.champs = res.data.champs;
        }

        this.loading = false;

      }, 200);

    }

  }

  close(){

    this.renderer.removeClass(document.body, 'fixed-body');
    this.opened = false;

  }

}
