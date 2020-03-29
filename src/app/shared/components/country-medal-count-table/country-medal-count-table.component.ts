import { Component, OnInit, Input, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-country-medal-count-table',
  templateUrl: './country-medal-count-table.component.html',
  styleUrls: ['./country-medal-count-table.component.scss']
})
export class CountryMedalCountTableComponent implements OnInit {

  @Input() data: any[] = [];

  showingData: any[] = [];
  showMore: boolean = false;

  constructor() { }

  ngOnInit() {

    this.showingData = this.data.slice(0, 10);

  }

  ngOnChanges(changes: SimpleChanges) {
    
    if (changes.data && !changes.data.firstChange){
      this.data = changes.data.currentValue;
      this.showingData = this.data.slice(0, 10);
    }

  }

  showMoreOrLess(){

    this.showMore = !this.showMore;

    if (this.showMore){
      this.showingData = this.data;
    } else {
      this.showingData = this.data.slice(0, 10);
    }

  }

}
