import { Component } from '@angular/core';
import { Router, RouteConfigLoadStart, RouteConfigLoadEnd } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Athletics Podium';
  
  loading: boolean;
  interval: any;

  constructor (private router: Router) {}

  ngOnInit () {
    this.router.events.subscribe(event => {
      if (event instanceof RouteConfigLoadStart) {
        this.loading = true;
      } else if (event instanceof RouteConfigLoadEnd) {
        this.loading = true;
        clearInterval(this.interval);
        this.interval = setTimeout(() => {
          this.loading = false;          
        }, 1000);
      }
    });
  }

}
