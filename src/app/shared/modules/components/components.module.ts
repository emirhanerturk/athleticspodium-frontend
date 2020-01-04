import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoaderComponent } from '@shared/components/loader/loader.component';
import { ErrorComponent } from '@shared/components/error/error.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    LoaderComponent,
    ErrorComponent,
  ],
  exports: [
    LoaderComponent,
    ErrorComponent,
  ]
})
export class ComponentsModule { }
