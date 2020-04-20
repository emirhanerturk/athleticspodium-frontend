import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MedalPipe } from '@pipes/medal.pipe';
import { GenderPipe } from '@pipes/gender.pipe';
import { StripHtmlTagsPipe } from '@pipes/strip-html-tags.pipe';
import { StringSlicePipe } from '@pipes/string-slice.pipe';
import { SafeHtmlPipe } from '@pipes/safe-html.pipe';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    MedalPipe,
    GenderPipe,
    StripHtmlTagsPipe,
    StringSlicePipe,
    SafeHtmlPipe,
  ],
  exports: [
    MedalPipe,
    GenderPipe,
    StripHtmlTagsPipe,
    StringSlicePipe,
    SafeHtmlPipe,
  ]
})
export class PipesModule { }
