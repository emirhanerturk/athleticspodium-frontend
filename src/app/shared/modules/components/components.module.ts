import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoaderComponent } from '@shared/components/loader/loader.component';
import { ErrorComponent } from '@shared/components/error/error.component';
import { BreadcrumbComponent } from '@shared/components/breadcrumb/breadcrumb.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    LoaderComponent,
    ErrorComponent,
    BreadcrumbComponent,
  ],
  exports: [
    LoaderComponent,
    ErrorComponent,
    BreadcrumbComponent,
  ]
})
export class ComponentsModule { }
