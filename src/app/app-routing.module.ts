import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LayoutComponent } from "@layouts/layout/layout.component";
import { NotFoundComponent } from '@modules/home/not-found/not-found.component';

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
        { path: '', loadChildren: () => import('./modules/home/home.module').then(m => m.HomeModule) },
        { path: 'champs', loadChildren: () => import('./modules/champs/champs.module').then(m => m.ChampsModule) },
        { path: 'country', loadChildren: () => import('./modules/country/country.module').then(m => m.CountryModule) },
        { path: 'athlete', loadChildren: () => import('./modules/athlete/athlete.module').then(m => m.AthleteModule) },
        { path: 'calendar', loadChildren: () => import('./modules/calendar/calendar.module').then(m => m.CalendarModule) },
        { path: 'medals', loadChildren: () => import('./modules/medal/medal.module').then(m => m.MedalModule) },
        { path: 'article', loadChildren: () => import('./modules/article/article.module').then(m => m.ArticleModule) },
    ]
  },
  {
    path: '404',
    component: NotFoundComponent
  },
  {
    path: '**',
    redirectTo: '/404'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { scrollPositionRestoration: 'enabled' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
