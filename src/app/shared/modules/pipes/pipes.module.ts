import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MedalPipe } from '@pipes/medal.pipe';
import { StripHtmlTagsPipe } from '@pipes/strip-html-tags.pipe';
import { StringSlicePipe } from '@pipes/string-slice.pipe';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    MedalPipe,
    StripHtmlTagsPipe,
    StringSlicePipe,
  ],
  exports: [
    MedalPipe,
    StripHtmlTagsPipe,
    StringSlicePipe,
  ]
})
export class PipesModule { }
