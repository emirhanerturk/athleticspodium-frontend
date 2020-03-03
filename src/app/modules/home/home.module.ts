import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { IndexComponent } from './index/index.component';
import { AboutComponent } from './about/about.component';

import { ComponentsModule } from '@shared/modules/components/components.module';
import { DirectivesModule } from '@shared/modules/directives/directives.module';
import { PipesModule } from '@shared/modules/pipes/pipes.module';

@NgModule({
  declarations: [IndexComponent, AboutComponent],
  imports: [
    CommonModule,
    HomeRoutingModule,
    ComponentsModule,
    DirectivesModule,
    PipesModule,
  ]
})
export class HomeModule { }
