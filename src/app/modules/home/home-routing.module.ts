import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { IndexComponent } from './index/index.component';
import { AboutComponent } from './about/about.component';
import { SimpleNotesComponent } from './simple-notes/simple-notes.component';
import { MissingInformationComponent } from './missing-information/missing-information.component';

const routes: Routes = [
  {
    path: '',
    component: IndexComponent,
    pathMatch: 'full'
  },
  {
    path: 'about',
    component: AboutComponent,
  },
  {
    path: 'simple-notes',
    component: SimpleNotesComponent
  },
  {
    path: 'missing-information',
    component: MissingInformationComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
