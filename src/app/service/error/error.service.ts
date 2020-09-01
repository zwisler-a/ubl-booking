import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { catchError, map } from 'rxjs/operators';
import { throwError, OperatorFunction } from 'rxjs';
import { Router } from '@angular/router';
import { ROUTE } from '../../routing/routes.enum';
import { AuthService } from '../auth/auth.service';
import { BookingResponse } from '../../types/booking-response.type';
import { Timeslot } from '../../types/timeslots.type';

@Injectable({
  providedIn: 'root',
})
export class ErrorService {
  constructor(private snackbar: MatSnackBar, private router: Router, private authService: AuthService) {}

  catchInstitutionsError(): OperatorFunction<any, any> {
    return catchError((err) => {
      this.snackbarWithLogout();
      return throwError(err);
    });
  }
  catchAreasError(): OperatorFunction<any, any> {
    return catchError((err) => {
      this.snackbarWithLogout();
      return throwError(err);
    });
  }

  catchTimeslotsError(): OperatorFunction<Timeslot, Timeslot> {
    return catchError((err) => {
      this.snackbarWithLogout();
      return throwError(err);
    });
  }

  catchBookingError(): OperatorFunction<BookingResponse, BookingResponse> {
    return catchError((err) => {
      if (err.message === 'sessionerror') {
        this.snackbarWithLogout('Ihre Session ist abgelaufen!');
        throw new Error(err.message);
      }
      const message =
        {
          '': 'Es konnte kein Arbeitsplatz zu diesen Bedingungen gefunden werden',
          concurrently_booking: 'Sie haben breits einen Arbeitsplatz zu dieser Zeit',
          server_error: 'Unbekannter Fehler (Versuchen Sie sich ab und wieder anzumelden)',
          outofreach: 'Sie können nur innerhalb der nächsten 7 Tage buchen!',
          outofdate: 'Der Buchungszeitrum ist außerhalb der Öffnungszeiten',
          notbookable2: 'Die Bibliothek ist vom 03.08 bis 14.08. geschlossen!',
          notbookable3: 'Die Bibliothek ist ab dem 03.08.2020 nur bis 16 Uhr geöffnet!',
          outoftime: 'Der Buchungszeitrum ist außerhalb der Öffnungszeiten',
          concurrent_error: 'Fehler bei der Buchung, bitte versuchen Sie es erneut!',
        }[err?.message] || 'Unbekannter Fehler';
      this.snackbar.open(message, 'Ok', { duration: 5000 });
      return throwError(err);
    });
  }

  private snackbarWithLogout(
    msg = 'Fehler beim Laden! Bitte melden Sie sich erneut an.',
    action = 'Anmelden'
  ): void {
    this.snackbar
      .open(msg, action, { duration: -1 })
      .afterDismissed()
      .subscribe(() => {
        this.authService.logout();
      });
  }
}
