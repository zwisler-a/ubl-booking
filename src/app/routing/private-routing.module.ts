import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ROUTE } from './routes.enum';
import { BookingComponent } from '../views/booking/booking.component';
import { AuthGuard } from '../service/auth/auth-guard.guard';
import { CancelationWithCodeComponent } from '../views/cancelation-with-code/cancelation-with-code.component';
import { BookingInformationComponent } from '../views/booking-information/booking-information.component';
import { BookingListComponent } from '../views/booking-list/booking-list.component';

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild([
      {
        path: ROUTE.BOOKING,
        component: BookingComponent,
        data: { title: ['Arbeitsplatz buchen'] },
        canActivate: [AuthGuard],
      },
      {
        path: ROUTE.CANCELATION,
        component: CancelationWithCodeComponent,
        data: { title: ['Buchungen', 'Stornieren'] },
        canActivate: [AuthGuard],
      },
      {
        path: ROUTE.BOOKING_INFO,
        component: BookingInformationComponent,
        data: { title: ['Buchungen', 'Buchung'] },
        canActivate: [AuthGuard],
      },
      {
        path: ROUTE.BOOKING_LIST,
        component: BookingListComponent,
        data: { title: ['Buchungen'] },
        canActivate: [AuthGuard],
      },
    ]),
  ],
})
export class PrivateRoutingModule {}
