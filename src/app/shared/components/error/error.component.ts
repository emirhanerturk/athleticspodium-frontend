import { Component, OnInit, Input } from '@angular/core';

import { AppService } from "@services/index";
import { IError } from '@interfaces/response.interface';

@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.scss']
})
export class ErrorComponent implements OnInit {

  @Input() error: IError|IError[];
  @Input() fullscreen: boolean = true;

  data: IError;

  constructor(private appService: AppService) { }

  ngOnInit() {

    this.appService.logError(this.error, 'ErrorComponent')

    if (Array.isArray(this.error)){
      this.data = this.error[0];
    } else {
      this.data = this.error;
    }

  }

}
