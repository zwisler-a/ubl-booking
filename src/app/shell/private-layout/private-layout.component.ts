import { Component, OnInit, HostListener } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from 'src/environments/environment';

import { ROUTE } from '../../routing/routes.enum';
import { rotateInOut } from '../../animations';
import { SwUpdate } from '@angular/service-worker';
import { SwVersionService } from '../sw-version.service';

@Component({
  selector: 'app-private-layout',
  templateUrl: './private-layout.component.html',
  styleUrls: ['./private-layout.component.css'],
  animations: [rotateInOut],
})
export class PrivateLayoutComponent implements OnInit {
  routes = ROUTE;
  title: string[];
  constructor(private route: ActivatedRoute, private router: Router, private swVersion: SwVersionService) {}

  ngOnInit(): void {
    this.router.events.subscribe(this.updateRoute.bind(this));
    this.updateRoute();
  }

  private updateRoute(): void {
    this.title = this.route.snapshot.firstChild?.data.title ?? [];
  }

  navigateUp(x: number): void {
    const up = Array.from({ length: x }, () => '..');
    this.router.navigate(up, { relativeTo: this.route.firstChild });
  }

  get version(): string {
    return environment.version;
  }

  get hasBookingManagement(): boolean {
    return environment.featureFlags.bookingsManagement;
  }

  swipeLeft(): void {
    this.router.navigate([this.routes.BOOKING_LIST]);
  }
  swipeRight(): void {
    this.router.navigate([this.routes.BOOKING]);
  }

  checkVersion(): void {
    this.swVersion.checkForUpdates();
  }
}
