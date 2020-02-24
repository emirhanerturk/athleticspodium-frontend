import { Component, OnInit, Input, Output, EventEmitter, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss']
})
export class PaginationComponent implements OnInit {

  @Input() total: number = 0;
  @Input() pageSize: number = 10;
  @Input() currentPage: number = 1;
  @Input() maxPageShows: number = 10;

  @Output() changedPage = new EventEmitter();

  pageCount: number = 0;
  pages: number[] = [];
  scenario: 'normal'|'begin'|'end'|'middle' = 'normal';

  constructor() { }

  ngOnInit() {

    this.calculatePageCount();

  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.total){
      this.total = changes.total.currentValue;
    }
    if (changes.currentPage){
      this.currentPage = changes.currentPage.currentValue;
    }
    if (changes.pageSize){
      this.pageSize = changes.pageSize.currentValue;
    }
    this.calculatePageCount();
  }

  calculatePageCount(){

    this.currentPage = +this.currentPage;
    this.pages = [];
    this.pageCount = Math.ceil(this.total / this.pageSize);

    this.scenario = 'normal';
    let beginPage = 1;
    let endPage = this.pageCount;
    if (this.pageCount > this.maxPageShows){

      if (this.currentPage <= (this.maxPageShows / 2) + 2){
        this.scenario = 'begin';
        beginPage = 1;
        endPage = beginPage + this.maxPageShows;
      } else if (this.currentPage >= this.pageCount - 2 - (this.maxPageShows / 2)){
        this.scenario = 'end';
        beginPage = this.pageCount - this.maxPageShows;
        endPage = this.pageCount;
      } else {
        this.scenario = 'middle';
        beginPage = this.currentPage - (this.maxPageShows / 2);
        endPage = this.currentPage + (this.maxPageShows / 2);
      }

    }

    for (let i = beginPage; i <= endPage; i++) {
      this.pages.push(i);
    }

  }

  setPage(page: number){
    this.currentPage = page;
    this.emit();
  }

  prev(){
    if (this.currentPage > 1){
      this.currentPage--;
      this.emit();
    }
  }

  next(){
    if (this.currentPage < this.pageCount){
      this.currentPage++;
      this.emit();
    }
  }

  emit(){
    this.changedPage.emit(this.currentPage);
  }

}
