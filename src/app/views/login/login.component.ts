import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ROUTE } from '../../routing/routes.enum';
import { AuthService } from 'src/app/service/auth/auth.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginFormGroup: FormGroup;
  inLoginProcess = false;
  constructor(
    fb: FormBuilder,
    private authService: AuthService,
    private snackbar: MatSnackBar,
    private router: Router
  ) {
    this.loginFormGroup = fb.group({
      readerNumber: [''],
      password: [''],
    });
  }

  login(): void {
    this.inLoginProcess = true;
    const { readerNumber, password } = this.loginFormGroup.getRawValue();
    this.authService.authenticate(readerNumber, password).subscribe((res) => {
      this.inLoginProcess = false;
      if (!res.success) return this.invalidLogin(res.message);
      this.validLogin();
    });
  }

  validLogin(): void {
    if (
      localStorage.getItem('disclaimer_accepted') === 'true' &&
      environment.featureFlags.rememberDisclaimerAcception
    ) {
      this.router.navigateByUrl('/' + ROUTE.BOOKING);
    } else {
      this.router.navigateByUrl('/' + ROUTE.DISCLAIMER);
    }
  }

  invalidLogin(message: string): void {
    this.snackbar.open(message, null, {
      duration: 3000,
    });
  }

  ngOnInit(): void {
    if (this.authService.isAuthenticated()) this.router.navigate(['/', ROUTE.BOOKING]);
  }
}
