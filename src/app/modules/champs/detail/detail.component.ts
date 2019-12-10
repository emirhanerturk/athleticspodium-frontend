import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { AppService } from "@services/app.service";
import { ChampsService } from "@services/champs.service";

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})
export class DetailComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private appService: AppService,
    private champsService: ChampsService
    ) {
      
    }

  ngOnInit() {

    this.appService.setNavigation(this.appService.ENavigation.CHAMPS)

    const champSlug = this.route.snapshot.paramMap.get('slug');
    this.champsService.GetChamp(champSlug).subscribe(data => {
      console.log(data);
    })

  }

}
