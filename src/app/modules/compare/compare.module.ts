import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { CompareRoutingModule } from './compare-routing.module';
import { CompareComponent } from './index/compare.component';

import { ComponentsModule } from '@shared/modules/components/components.module';
import { DirectivesModule } from '@shared/modules/directives/directives.module';
import { PipesModule } from '@shared/modules/pipes/pipes.module';

@NgModule({
  declarations: [CompareComponent],
  imports: [
    CommonModule,
    FormsModule,
    CompareRoutingModule,
    ComponentsModule,
    DirectivesModule,
    PipesModule,
  ],
})
export class CompareModule {}
