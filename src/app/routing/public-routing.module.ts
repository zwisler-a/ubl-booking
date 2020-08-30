import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginModule } from '../views/login/login.module';
import { DisclaimerModule } from '../views/disclaimer/disclaimer.module';
import { RouterModule } from '@angular/router';
import { ROUTE } from './routes.enum';
import { LoginComponent } from '../views/login/login.component';
import { DisclaimerComponent } from '../views/disclaimer/disclaimer.component';

@NgModule({
  declarations: [],
  imports: [
    LoginModule,
    DisclaimerModule,
    RouterModule.forChild([
      {
        path: '',
        component: LoginComponent,
        data: { width: 500 },
      },
      {
        path: 'disclaimer',
        component: DisclaimerComponent,
        data: { width: 600 },
      },
      { path: '', redirectTo: 'login', pathMatch: 'full' },
    ]),
  ],
})
export class PublicRoutingModule {}
