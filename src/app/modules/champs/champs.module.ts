import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ChampsRoutingModule } from './champs-routing.module';
import { IndexComponent } from './index/index.component';
import { DetailComponent } from './detail/detail.component';
import { MeetingComponent } from './meeting/meeting.component';

import { ComponentsModule } from '@shared/modules/components/components.module';
import { DirectivesModule } from '@shared/modules/directives/directives.module';
import { PipesModule } from '@shared/modules/pipes/pipes.module';

@NgModule({
  declarations: [IndexComponent, DetailComponent, MeetingComponent],
  imports: [
    CommonModule,
    ChampsRoutingModule,
    ComponentsModule,
    DirectivesModule,
    PipesModule,
  ]
})
export class ChampsModule { }
