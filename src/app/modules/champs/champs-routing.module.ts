import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { IndexComponent } from './index/index.component';
import { DetailComponent } from './detail/detail.component';
import { MeetingComponent } from './meeting/meeting.component';

const routes: Routes = [
  {
    path: '',
    component: IndexComponent,
    pathMatch: 'full'
  },
  {
    path: ':champ_slug',
    component: DetailComponent,
    pathMatch: 'full'
  },
  {
    path: ':champ_slug/:meeting_slug',
    component: MeetingComponent,
    pathMatch: 'full'
  },
  {
    path: '**',
    redirectTo: '/404'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ChampsRoutingModule { }
