import { Component, OnInit } from '@angular/core';

import { AppService, ENavigation } from "@services/app.service";
import { AthleteService } from "@services/athlete.service";
import { IAthlete } from '@core/interfaces/models.interface';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss']
})
export class IndexComponent implements OnInit {

  alphabet: string[] = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"];
  selectedLetter: string = 'A';

  athletes: IAthlete[];
  page: number = 1;
  count: number = 0;

  constructor(private appService: AppService, private athleteService: AthleteService) { }

  ngOnInit() {

    this.appService.setNavigation(ENavigation.ATHLETES)
    this.appService.setTitle('Athletes');

    this.getAthletes();

  }

  async getAthletes(){

    const res = await this.athleteService.GetAthleteByFirstLetter(this.selectedLetter, this.page);
    if (res.success){
      this.athletes = res.data.rows;
      this.count = res.data.count;
    }

  }

  onChangeLetter(letter: string){

    this.selectedLetter = letter;
    this.page = 1;
    this.getAthletes();

  }

  onChangePage(page){

    this.page = page;
    this.getAthletes();

  }

}
