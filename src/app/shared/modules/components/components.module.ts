import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule }   from '@angular/forms';

import { LoaderComponent } from '@shared/components/loader/loader.component';
import { ErrorComponent } from '@shared/components/error/error.component';
import { BreadcrumbComponent } from '@shared/components/breadcrumb/breadcrumb.component';
import { MedalSearchFormComponent } from '@shared/components/medal-search-form/medal-search-form.component';
import { PaginationComponent } from '@shared/components/pagination/pagination.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
  ],
  declarations: [
    LoaderComponent,
    ErrorComponent,
    BreadcrumbComponent,
    MedalSearchFormComponent,
    PaginationComponent,
  ],
  exports: [
    LoaderComponent,
    ErrorComponent,
    BreadcrumbComponent,
    MedalSearchFormComponent,
    PaginationComponent,
  ]
})
export class ComponentsModule { }
