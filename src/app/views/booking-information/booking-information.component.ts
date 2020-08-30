import { Component, OnInit } from '@angular/core';
import { BookingService } from 'src/app/service/booking/booking.service';
import { ActivatedRoute, Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { BookingResponse } from 'src/app/types/booking-response.type';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmCancelationComponent } from './components/confirm-cancelation/confirm-cancelation.component';
import { ROUTE } from '../../routing/routes.enum';

@Component({
  selector: 'app-booking-information',
  templateUrl: './booking-information.component.html',
  styleUrls: ['./booking-information.component.css'],
})
export class BookingInformationComponent implements OnInit {
  booking$: Observable<BookingResponse>;
  bookingListRoute = '/' + ROUTE.BOOKING_LIST;
  cancelationInProgress: boolean;
  constructor(
    private bookingService: BookingService,
    private activeRoute: ActivatedRoute,
    private router: Router,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.booking$ = this.activeRoute.params.pipe(
      map((params) => this.bookingService.getBooking(params.id))
    );
  }

  cancelBooking(id: string): void {
    this.dialog
      .open(ConfirmCancelationComponent)
      .afterClosed()
      .subscribe((res) => {
        if (res) {
          this.cancelationInProgress = true;
          this.bookingService.cancelBooking(id).subscribe(() => {
            this.cancelationInProgress = false;
            this.router.navigate(['/', ROUTE.BOOKING_LIST]);
          });
        }
      });
  }
}
