import { Component, OnInit } from '@angular/core';
import { fadeIn } from 'src/app/animations';
import { Router } from '@angular/router';
import { ROUTE } from '../../routing/routes.enum';
import { environment } from 'src/environments/environment';
import { AuthService } from 'src/app/service/auth/auth.service';

@Component({
  selector: 'app-disclaimer',
  templateUrl: './disclaimer.component.html',
  styleUrls: ['./disclaimer.component.css'],
  animations: [fadeIn],
})
export class DisclaimerComponent implements OnInit {
  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    if (
      localStorage.getItem('disclaimer_accepted') === 'true' &&
      environment.featureFlags.rememberDisclaimerAcception
    ) {
      this.router.navigateByUrl('/' + ROUTE.BOOKING);
    }
  }

  accept(): void {
    localStorage.setItem('disclaimer_accepted', 'true');
    this.router.navigateByUrl('/' + ROUTE.BOOKING);
  }

  cancel(): void {
    this.authService.logout();
  }
}
