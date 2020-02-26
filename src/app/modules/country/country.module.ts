import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CountryRoutingModule } from './country-routing.module';
import { IndexComponent } from './index/index.component';
import { DetailComponent } from './detail/detail.component';
import { AthletesComponent } from './athletes/athletes.component';

import { ComponentsModule } from '@shared/modules/components/components.module';
import { DirectivesModule } from '@shared/modules/directives/directives.module';
import { PipesModule } from '@shared/modules/pipes/pipes.module';

@NgModule({
  declarations: [IndexComponent, DetailComponent, AthletesComponent],
  imports: [
    CommonModule,
    CountryRoutingModule,
    ComponentsModule,
    DirectivesModule,
    PipesModule,
  ]
})
export class CountryModule { }
