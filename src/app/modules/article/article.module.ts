import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ArticleRoutingModule } from './article-routing.module';
import { IndexComponent } from './index/index.component';

import { ComponentsModule } from '@shared/modules/components/components.module';
import { DirectivesModule } from '@shared/modules/directives/directives.module';
import { PipesModule } from '@shared/modules/pipes/pipes.module';
import { DetailComponent } from './detail/detail.component';

@NgModule({
  declarations: [IndexComponent, DetailComponent],
  imports: [
    CommonModule,
    ArticleRoutingModule,
    ComponentsModule,
    DirectivesModule,
    PipesModule,
  ]
})
export class ArticleModule { }
