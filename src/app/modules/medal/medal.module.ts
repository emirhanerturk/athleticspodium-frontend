import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MedalRoutingModule } from './medal-routing.module';
import { SearchComponent } from './search/search.component';

import { ComponentsModule } from '@shared/modules/components/components.module';
import { DirectivesModule } from '@shared/modules/directives/directives.module';
import { PipesModule } from '@shared/modules/pipes/pipes.module';

@NgModule({
  declarations: [SearchComponent],
  imports: [
    CommonModule,
    MedalRoutingModule,
    ComponentsModule,
    DirectivesModule,
    PipesModule,
  ]
})
export class MedalModule { }
