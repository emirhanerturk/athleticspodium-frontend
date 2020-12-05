import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { AppService, MedalService, WindowScroll } from '@services/index';
import { IError } from '@interfaces/response.interface';
import { IMedal } from '@interfaces/models.interface';
import { IMedalSearch } from '@interfaces/medal-search.interface';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

  loading: boolean = false;
  error: IError | IError[];

  medals: IMedal[];
  count: number = 0;
  counts: {
    gold: number,
    silver: number,
    bronze: number
  };
  queries: IMedalSearch;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private appService: AppService,
    private medalService: MedalService
  ) { }

  ngOnInit() {

    this.appService.setNavigation(null);
    this.appService.setTitle('Medal Search');
    this.appService.setMeta('You can search any medal in athletics history, sorted by country, type, event, or year.');

    this.route.params.subscribe((queries: IMedalSearch) => {
      if (Object.keys(queries).length) {
        this.queries = {
          champs: '',
          country: '',
          event: '',
          year: '',
          gender: '',
          medal: '',
          is_canceled: '0',
          page: 1,
        }
        this.queries = { ...this.queries, ...queries };
        this.searchMedals();
      }
    });

  }

  async searchMedals(){

    this.loading = true;
    this.error = null;

    const res = await this.medalService.List(this.queries);
    if (res.success){
      this.medals = res.data.rows;
      this.count = res.data.count;
      this.counts = res.data.counts;
    } else {
      this.error = res.error;
    }

    this.loading = false;
    
  }

  changedPage(page: number){

    WindowScroll();
    this.queries.page = page;
    this.router.navigate(['/medals/search', this.queries]);

  }

}
