import { Component, OnInit, Input } from '@angular/core';

import { IBreadcrumb } from '@interfaces/breadcrumb.interface';

@Component({
  selector: 'app-breadcrumb',
  templateUrl: './breadcrumb.component.html',
  styleUrls: ['./breadcrumb.component.scss']
})
export class BreadcrumbComponent implements OnInit {

  @Input() data: IBreadcrumb[];

  constructor() { }

  ngOnInit() {
  }

}
