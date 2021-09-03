import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable, of, BehaviorSubject, Subject } from 'rxjs';
import { catchError, flatMap, map, shareReplay, switchMap, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

import { BookingConfig } from '../../types/booking-config.type';
import { BookingResponse } from '../../types/booking-response.type';
import { Booking } from '../../types/booking.type';
import { AuthService } from '../auth/auth.service';
import { ErrorService } from '../error/error.service';

// Included via angular.json
declare const ics: () => {
  addEvent: (
    subject: string,
    description: string,
    location: string,
    begin: Date | number,
    end: Date | number
  ) => void;
  download: () => void;
};

@Injectable({
  providedIn: 'root',
})
export class BookingService {
  private readonly bookingApi = environment.api.basePath + environment.api.booking;
  private readonly bookingsApi = environment.api.basePath + environment.api.bookings;
  private readonly stornoApi = environment.api.basePath + environment.api.strono;

  private updateBookings$ = new BehaviorSubject<void>(null);
  private bookingCache$: Observable<Booking[]>;

  constructor(
    private http: HttpClient,
    private authService: AuthService,
    private snackbar: MatSnackBar,
    private errorService: ErrorService
  ) {}

  book(config: BookingConfig): Observable<BookingResponse> {
    let body = new HttpParams();
    config.token = this.authService.getToken();
    config.readernumber = this.authService.getReaderNumber();
    Object.keys(config).forEach((key) => {
      if (key === 'fitting') {
        config[key].forEach((f) => {
          body = body.append('fitting', f);
        });
      } else {
        body = body.set(key, config[key]);
      }
    });
    body = body.append('tslot', '0');
    body = body.append('preference', '0');

    return this.http
      .post<BookingResponse>(this.bookingApi, body.toString(), {
        headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded'),
      })
      .pipe(
        map((result) => {
          if (!result || result.bookingCode === '') throw new Error(result.message);
          return result;
        }),
        this.errorService.catchBookingError(),
        flatMap((result) => this.authService.refreshToken().pipe(map((auth) => result))),
        tap(() => this.updateBookings$.next())
      );
  }

  cancelBooking(id: string, from: string, until: string): Observable<boolean> {
    const body = new HttpParams()
      .set('readernumber', this.authService.getReaderNumber())
      .set('token', this.authService.getAdminToken())
      .set('from', from)
      .set('until', until)
      .set('bookingcode', id);
    console.log(body.toString(), from, until);
    return this.http
      .post(this.stornoApi, body.toString(), {
        headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded'),
      })
      .pipe(
        map((res: any) => {
          this.snackbar.open(res.message, null, { duration: 5000 });
          if (res.message !== 'Ihre Buchung wurde gelöscht.') return false;
          return true;
        }),
        flatMap((result) => this.authService.refreshToken().pipe(map((auth) => result))),
        tap(() => this.updateBookings$.next()),
        catchError((err) => of(false))
      );
  }

  getBookings(): Observable<Booking[]> {
    if (!this.bookingCache$) {
      this.bookingCache$ = this.updateBookings$.pipe(
        switchMap(() =>
          this.http
            .post<{ bookings: Booking[] }>(
              this.bookingsApi,
              JSON.stringify({
                token: this.authService.getAdminToken(),
                readernumber: this.authService.getReaderNumber(),
              }),
              { headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded') }
            )
            .pipe(
              flatMap((res) => {
                if (res && res.bookings) return of(res.bookings);
                return this.authService.refreshToken().pipe(map(() => []));
              })
            )
        ),
        shareReplay(1)
      );
    }

    return this.bookingCache$;
  }

  getBooking(id: string): Observable<Booking> {
    return this.getBookings().pipe(map((bookings) => bookings.find((booking) => booking.bookingCode === id)));
  }

  reloadBookings(): void {
    this.updateBookings$.next();
  }

  createICalDownload(booking: Booking): void {
    const cal = ics();
    cal.addEvent(
      `Arbeitsplatzbuchung "${booking.institution}"`,
      `Buchungscode: ${booking.bookingCode}`,
      `${booking.institution}`,
      booking.start,
      booking.end
    );
    cal.download();
  }
}
