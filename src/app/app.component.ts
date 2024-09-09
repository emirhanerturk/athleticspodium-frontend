import { Component } from '@angular/core';
import {
  Router,
  NavigationEnd,
  RouteConfigLoadStart,
  RouteConfigLoadEnd,
} from '@angular/router';
import { filter } from 'rxjs/operators';

import { AppService } from '@services/index';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'Athletics Podium';
  loading: boolean;
  interval: any;

  constructor(private router: Router, private appService: AppService) {
    const navEndEvents = this.router.events.pipe(
      filter((event) => event instanceof NavigationEnd)
    );

    const loadStartEvents = this.router.events.pipe(
      filter((event) => event instanceof RouteConfigLoadStart)
    );

    const loadEndEvents = this.router.events.pipe(
      filter((event) => event instanceof RouteConfigLoadEnd)
    );

    navEndEvents.subscribe((e: NavigationEnd) => {
      setTimeout(() => {
        this.appService.analytics(e.urlAfterRedirects);
      }, 2000);
    });

    loadStartEvents.subscribe((e: RouteConfigLoadStart) => {
      this.loading = true;
    });

    loadEndEvents.subscribe((e: RouteConfigLoadEnd) => {
      this.loading = true;
      clearInterval(this.interval);
      this.interval = setTimeout(() => {
        this.loading = false;
      }, 1000);
    });
  }
}
