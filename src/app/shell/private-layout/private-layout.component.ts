import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from 'src/environments/environment';

import { ROUTE } from '../../routing/routes.enum';
import { rotateInOut } from '../../animations';

@Component({
  selector: 'app-private-layout',
  templateUrl: './private-layout.component.html',
  styleUrls: ['./private-layout.component.css'],
  animations: [rotateInOut],
})
export class PrivateLayoutComponent implements OnInit {
  routes = ROUTE;
  title: string[];
  constructor(private route: ActivatedRoute, private router: Router) {}

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
}
