import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BookingService } from 'src/app/service/booking/booking.service';
import { Router } from '@angular/router';
import { ROUTE } from '../../routing/routes.enum';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-cancelation-with-code',
  templateUrl: './cancelation-with-code.component.html',
  styleUrls: ['./cancelation-with-code.component.css'],
})
export class CancelationWithCodeComponent implements OnInit {
  cancelationInProgress = false;
  cancelationFormGroup: FormGroup;
  constructor(
    fb: FormBuilder,
    private bookingService: BookingService,
    private router: Router,
    private snackbar: MatSnackBar
  ) {
    this.cancelationFormGroup = fb.group({
      code: ['', Validators.required],
    });
  }

  ngOnInit(): void {}

  cancel(): void {
    /*const id: string = this.cancelationFormGroup.getRawValue().code;
    this.cancelationInProgress = true;
    this.bookingService.cancelBooking(id).subscribe((res) => {
      if (res) {
        this.router.navigateByUrl('/' + ROUTE.BOOKING_LIST);
        this.snackbar.open('Die Buchung wurde storniert', null, {
          duration: 5000,
        });
      }
      this.cancelationInProgress = false;
    });*/
  }
}
