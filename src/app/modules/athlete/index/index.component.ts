import { Component, OnInit } from '@angular/core';

import { AppService, AthleteService, WindowScroll } from "@services/index";
import { IAthlete } from '@interfaces/models.interface';
import { ENavigation } from "@enums/navigation.enum";

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss']
})
export class IndexComponent implements OnInit {

  alphabet: string[] = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"];
  selectedLetter: string = 'A';

  athletesL: IAthlete[];
  athletesR: IAthlete[];
  page: number = 1;
  pageSize: number = 100;
  count: number = 0;

  athletesBorns: IAthlete[];
  athletesDeaths: IAthlete[];

  pageSizeTodays: number = 10;
  pageBorns: number = 1;
  pageDeaths: number = 1;
  countBorns: number = 0;
  countDeaths: number = 0;

  constructor(private appService: AppService, private athleteService: AthleteService) { }

  ngOnInit() {

    this.appService.setNavigation(ENavigation.ATHLETES)
    this.appService.setTitle('Athletes');
    this.appService.setMeta('This page listed all athletes who owns international competition medals from all over the World.');

    this.getAthletes();
    this.getTodaysBorns();
    this.getTodaysDeaths();

  }

  async getAthletes(){

    const res = await this.athleteService.GetAthleteByFirstLetter(this.selectedLetter, this.page);
    if (res.success){
      this.athletesL = res.data.rows.filter((r: IAthlete, i: number) => i < 50)
      this.athletesR = res.data.rows.filter((r: IAthlete, i: number) => i > 49)
      this.count = res.data.count;
    }

  }

  async getTodaysBorns(){

    const now = new Date();
    const date_of_birth = `${now.getMonth() + 1}-${now.getDate()}`; 
    const res = await this.athleteService.List({ date_of_birth }, ['country'], 'date_of_birth', this.pageSizeTodays, (this.pageBorns - 1) * 10);
    if (res.success){
      this.athletesBorns = res.data.rows;
      this.countBorns = res.data.count;
    }

  }

  async getTodaysDeaths(){

    const now = new Date();
    const date_of_death = `${now.getMonth() + 1}-${now.getDate()}`; 
    const res = await this.athleteService.List({ date_of_death }, ['country'], 'date_of_death');
    if (res.success){
      this.athletesDeaths = res.data.rows;
      this.countDeaths = res.data.count;
    }

  }

  onChangeLetter(letter: string){

    this.selectedLetter = letter;
    this.page = 1;
    this.getAthletes();

  }

  onChangePage(page: number){

    WindowScroll()
    this.page = page;
    this.getAthletes();

  }

  onChangePageTodays(type: 'borns'|'deaths', page: number){

    WindowScroll();
    switch (type) {
      case 'borns':
        this.pageBorns = page;
        this.getTodaysBorns();
        break;
      case 'deaths':
        this.pageDeaths = page;
        this.getTodaysDeaths();
        break;
    }

  }

}
