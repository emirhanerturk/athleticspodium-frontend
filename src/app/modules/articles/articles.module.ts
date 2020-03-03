import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ArticlesRoutingModule } from './articles-routing.module';
import { IndexComponent } from './index/index.component';

import { ComponentsModule } from '@shared/modules/components/components.module';
import { DirectivesModule } from '@shared/modules/directives/directives.module';
import { PipesModule } from '@shared/modules/pipes/pipes.module';

@NgModule({
  declarations: [IndexComponent],
  imports: [
    CommonModule,
    ArticlesRoutingModule,
    ComponentsModule,
    DirectivesModule,
    PipesModule,
  ]
})
export class ArticlesModule { }
