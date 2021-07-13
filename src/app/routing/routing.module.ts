import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { PrivateLayoutComponent } from '../shell/private-layout/private-layout.component';
import { PublicLayoutComponent } from '../shell/public-layout/public-layout.component';
import { ROUTE } from './routes.enum';
import { AuthGuard } from '../service/auth/auth-guard.guard';

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot([
    {
        path: ROUTE.LOGIN,
        component: PublicLayoutComponent,
        loadChildren: () => import('./public-routing.module').then((m) => m.PublicRoutingModule),
    },
    {
        path: '',
        component: PrivateLayoutComponent,
        canActivate: [AuthGuard],
        loadChildren: () => import('./private-routing.module').then((m) => m.PrivateRoutingModule),
    },
    { path: '**', redirectTo: 'login' },
], { relativeLinkResolution: 'legacy' }),
  ],
  exports: [RouterModule],
})
export class RoutingModule {}
