import { Component, OnInit } from '@angular/core';
import { BookingService } from 'src/app/service/booking/booking.service';
import { ActivatedRoute, Router } from '@angular/router';
import { map, flatMap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { BookingResponse } from 'src/app/types/booking-response.type';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmCancelationComponent } from './components/confirm-cancelation/confirm-cancelation.component';
import { ROUTE } from '../../routing/routes.enum';
import { Booking } from 'src/app/types/booking.type';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-booking-information',
  templateUrl: './booking-information.component.html',
  styleUrls: ['./booking-information.component.css'],
})
export class BookingInformationComponent implements OnInit {
  booking$: Observable<Booking>;
  bookingListRoute = '/' + ROUTE.BOOKING_LIST;
  cancelationInProgress: boolean;
  constructor(
    private bookingService: BookingService,
    private activeRoute: ActivatedRoute,
    private router: Router,
    private dialog: MatDialog,
    private datePipe: DatePipe
  ) {}

  ngOnInit(): void {
    this.booking$ = this.activeRoute.params.pipe(
      flatMap((params) => this.bookingService.getBooking(params.id))
    );
  }

  cancelBooking(booking: Booking): void {
    this.dialog
      .open(ConfirmCancelationComponent)
      .afterClosed()
      .subscribe((res) => {
        if (res) {
          this.cancelationInProgress = true;
          this.bookingService
            .cancelBooking(
              booking.bookingCode,
              this.datePipe.transform(booking.start, 'HH:mm'),
              this.datePipe.transform(booking.end, 'HH:mm')
            )
            .subscribe(() => {
              this.cancelationInProgress = false;
              this.router.navigate(['/', ROUTE.BOOKING_LIST]);
            });
        }
      });
  }

  downloadICal(booking: Booking): void {
    this.bookingService.createICalDownload(booking);
  }
}
