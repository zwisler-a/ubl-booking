import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { AuthService } from '../auth/auth.service';
import { BookingConfig } from '../../types/booking-config.type';
import { BookingResponse } from '../../types/booking-response.type';
import { environment } from 'src/environments/environment';
import { Observable, of } from 'rxjs';
import { tap, map, flatMap, catchError } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ErrorService } from '../error/error.service';
import { ValueConverter } from '@angular/compiler/src/render3/view/template';

@Injectable({
  providedIn: 'root',
})
export class BookingService {
  private readonly bookingApi = environment.api.basePath + environment.api.booking;

  private readonly stornoApi = environment.api.basePath + environment.api.strono;

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
        map((result) => {
          return this.storeBooking(result, config);
        })
      );
  }

  cancelBooking(id: string): Observable<boolean> {
    const body = new HttpParams()
      .set('readernumber', this.authService.getReaderNumber())
      .set('password', this.authService.getPassword())
      .set('bookingcode', id);
    return this.http
      .post(this.stornoApi, body.toString(), {
        headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded'),
      })
      .pipe(
        map((res: any) => {
          this.snackbar.open(res.message, null, { duration: 5000 });
          if (res.message === 'Der angegebene Buchungscode wurde nicht gefunden!') this.removeBooking(id);
          if (res.message !== 'Ihre Buchung wurde gelöscht.') return false;
          this.removeBooking(id);
          return true;
        }),
        catchError((err) => of(false))
      );
  }

  private storeBooking(booking: BookingResponse, config: BookingConfig): BookingResponse {
    if (!booking || booking.bookingCode === '' || !booking.bookingCode)
      return {
        bookingCode: '',
        message: booking.message,
      } as BookingResponse;

    booking.config = config;

    const storage = JSON.parse(localStorage.getItem(this.authService.getReaderNumber() + 'bookings') || '[]');
    storage.push(booking);
    localStorage.setItem(this.authService.getReaderNumber() + 'bookings', JSON.stringify(storage));

    return booking;
  }

  private filterOldBookings(): void {
    const bookings = this.getBookingsFromStorage();
    bookings.forEach((booking) => {
      const splits = booking.config.from_date.split('-');
      const curr = new Date();
      const year = Number.parseInt(splits[0], 10) <= curr.getFullYear();
      const month = Number.parseInt(splits[1], 10) <= curr.getMonth() + 1;
      const day = Number.parseInt(splits[2], 10) < curr.getDate();
      if (year && month && day) {
        this.removeBooking(booking.bookingCode);
      }
    });
  }

  private removeBooking(id: string): void {
    let storage = this.getBookingsFromStorage();
    storage = storage.filter((booking) => booking.bookingCode !== id);
    localStorage.setItem(this.authService.getReaderNumber() + 'bookings', JSON.stringify(storage));
  }

  private getBookingsFromStorage(): BookingResponse[] {
    return JSON.parse(localStorage.getItem(this.authService.getReaderNumber() + 'bookings') || '[]');
  }

  getBookings(): BookingResponse[] {
    this.filterOldBookings();
    return this.getBookingsFromStorage().sort((a, b) => a.config.from_date.localeCompare(b.config.from_date));
  }
  getBooking(id: string): BookingResponse {
    return this.getBookingsFromStorage().find((booking) => booking.bookingCode === id);
  }
}
