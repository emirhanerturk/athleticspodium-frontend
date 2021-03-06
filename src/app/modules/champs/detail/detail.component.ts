import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { AppService, ChampsService } from "@services/index";
import { IBreadcrumb, IChamps } from '@interfaces/index';
import { ENavigation } from "@enums/navigation.enum";

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})
export class DetailComponent implements OnInit {

  loading: boolean = true;
  error: any;
  breadcrumbs: IBreadcrumb[];

  champs: IChamps;
  totals: any[];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private appService: AppService,
    private champsService: ChampsService,
  ) { }

  ngOnInit() {

    this.appService.setNavigation(ENavigation.CHAMPS);

    this.route.params.subscribe(params => {
      
      const champ_slug = params.champ_slug;
      this.getChamps(champ_slug);

    })

  }

  async getChamps(champs_slug: string){

    this.loading = true;
    this.error = null;

    const res = await this.champsService.GetChamps(champs_slug);
    if (res.success){
      this.champs = res.data;

      this.appService.setTitle(this.champs.name);
      this.appService.setMeta(`This page is compiling all medals which is distributed in ${this.champs.name}.`);

      this.breadcrumbs = [
        { name: 'Champs', uri: `/champs` },
        { name: this.champs.name, uri: `/champs/${this.champs.slug}` },
      ];

      this.getTotals();

    } else {
      this.error = res.error
    }

    this.loading = false;

  }

  async getTotals(){

    const res = await this.champsService.GetCounts(this.champs.id);
    if (res){
      this.totals = res.data;
    }

  }

  changeMeeting(e: any){

    const value = e.target.value;
    this.router.navigateByUrl(`/champs/${this.champs.slug}/${value}`);

  }

}
