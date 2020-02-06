import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { AppService } from '@services/app.service';
import { MedalService } from "@services/medal.service";
import { IError } from '@interfaces/response.interface';
import { IMedal } from '@interfaces/models.interface';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

  loading: boolean = true;
  error: IError | IError[];

  medals: IMedal[];
  count: number = 0;
  queries: any;
  Math = Math;

  constructor(
    private route: ActivatedRoute,
    private appService: AppService,
    private medalService: MedalService
  ) { }

  ngOnInit() {

    this.appService.setNavigation(null);

    this.route.params.subscribe(queries => {
      if (queries) {
        this.queries = queries
        this.searchMedals(queries)
      }
    })

    // this.route.queryParams.subscribe(queries => {
    //   console.log('queries', queries);
    //   if (queries) this.searchMedals(queries)
    // });

  }

  async searchMedals(queries: Object){

    this.loading = true;

    const res = await this.medalService.Search(queries);
    if (res.success){
      this.medals = res.data.rows;
      this.count = res.data.count;
    } else {
      this.error = res.error;
    }

    this.loading = false;
    
  }

}
