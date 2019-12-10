import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ChampsRoutingModule } from './champs-routing.module';

import { IndexComponent } from './index/index.component';
import { DetailComponent } from './detail/detail.component';

@NgModule({
  declarations: [IndexComponent, DetailComponent],
  imports: [
    CommonModule,
    ChampsRoutingModule
  ]
})
export class ChampsModule { }
