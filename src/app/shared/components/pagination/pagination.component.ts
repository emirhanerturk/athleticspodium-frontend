import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss']
})
export class PaginationComponent implements OnInit {

  @Input() total: number = 0;
  @Input() pageSize: number = 10;
  @Input() currentPage: number = 1;

  @Output() changedPage = new EventEmitter();

  pageCount: number = 0;
  pages: number[] = [];

  constructor() { }

  ngOnInit() {

    this.calculatePageCount();

  }

  calculatePageCount(){

    this.pageCount = Math.ceil(this.total / this.pageSize);
    for (let i = 1; i <= this.pageCount; i++) {
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
