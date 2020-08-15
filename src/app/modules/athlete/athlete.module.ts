import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LightboxModule } from 'ngx-lightbox';

import { AthleteRoutingModule } from './athlete-routing.module';
import { IndexComponent } from './index/index.component';
import { DetailComponent } from './detail/detail.component';

import { ComponentsModule } from '@shared/modules/components/components.module';
import { DirectivesModule } from '@shared/modules/directives/directives.module';
import { PipesModule } from '@shared/modules/pipes/pipes.module';

@NgModule({
  declarations: [IndexComponent, DetailComponent],
  imports: [
    CommonModule,
    LightboxModule,
    AthleteRoutingModule,
    ComponentsModule,
    DirectivesModule,
    PipesModule,
  ]
})
export class AthleteModule { }
