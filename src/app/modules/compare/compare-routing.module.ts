import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CompareComponent } from './index/compare.component';

const routes: Routes = [
  {
    path: '',
    component: CompareComponent,
    pathMatch: 'full',
  },
  {
    path: '**',
    redirectTo: '/404',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CompareRoutingModule {}
