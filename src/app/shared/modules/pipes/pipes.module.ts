import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MedalPipe } from '@pipes/medal.pipe';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    MedalPipe,
  ],
  exports: [
    MedalPipe,
  ]
})
export class PipesModule { }
