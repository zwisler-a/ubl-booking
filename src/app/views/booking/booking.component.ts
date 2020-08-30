import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSelect } from '@angular/material/select';
import { Router } from '@angular/router';
import { combineLatest, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { fadeIn } from 'src/app/animations';
import { Timeslot } from 'src/app/types/timeslots.type';

import { ROUTE } from '../../routing/routes.enum';
import { BookingService } from '../../service/booking/booking.service';
import { InstitutionService } from '../../service/institution/institution.service';
import { LogMethodCall } from '../../service/logging/log-method-call.decorator';
import { PreferencesService } from '../../service/preference/preferences.service';
import { WorkloadService } from '../../service/workload/workload.service';

@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.css'],
  animations: [fadeIn],
})
export class BookingComponent implements OnInit {
  institutions$;
  bookingInfo$: Observable<{ areas: string[]; timeslots: Timeslot }>;

  state: string;

  @ViewChild('institutionSelect', { static: true })
  institutionSelect: MatSelect;

  bookingFormGroup: FormGroup;

  inBookingProcess = false;
  capacityForDay: number;

  constructor(
    private institutionService: InstitutionService,
    private prefService: PreferencesService,
    private bookingService: BookingService,
    private workloadService: WorkloadService,
    private fb: FormBuilder,
    private router: Router
  ) {
    this.institutions$ = this.institutionService.getInstitutions();

    const preferedInstitution = this.prefService.getPreferedInstitution();
    this.bookingFormGroup = this.fb.group({
      institution: [preferedInstitution],
      area: ['no selection', Validators.required],
      fitting: [[]],
      from_date: [new Date(), Validators.required],
      from_time: [null, Validators.required],
      until_time: [null, Validators.required],
    });
  }

  ngOnInit(): void {
    this.bookingFormGroup.get('institution').valueChanges.subscribe(this.institutionSelected.bind(this));
    this.bookingFormGroup.get('from_date').valueChanges.subscribe(this.calcCapacityDay.bind(this));

    if (this.prefService.getPreferedInstitution())
      this.institutionSelected(this.prefService.getPreferedInstitution());
  }

  async institutionSelected(value: string): Promise<any> {
    this.prefService.getPreferedSeat(value, this.bookingFormGroup);
    this.prefService.setPreferedInstitution(value);
    this.bookingInfo$ = combineLatest([
      this.institutionService.getTimesolts(value),
      this.institutionService.getAreas(value),
      this.workloadService.getWorkload(value),
    ]).pipe(map(([timeslots, areas, capacity]) => ({ areas, timeslots, capacity })));
  }

  @LogMethodCall()
  book(): void {
    const bookingConfig = this.bookingFormGroup.getRawValue();
    this.prefService.setPreferedSeat(bookingConfig.institution, this.bookingFormGroup);

    this.inBookingProcess = true;
    const bookingSuccess = (result) => {
      const url = '/' + ROUTE.BOOKING_INFO.replace(':id', result.bookingCode);
      this.router.navigateByUrl(url);
    };
    const bookingFailure = (err) => {
      this.inBookingProcess = false;
    };

    this.bookingService
      .book({
        area: bookingConfig.area,
        from_date: this.convertDate(bookingConfig.from_date),
        from_time: bookingConfig.from_time,
        until_time: bookingConfig.until_time,
        institution: bookingConfig.institution,
        fitting: bookingConfig.fitting,
      })
      .subscribe({
        next: bookingSuccess,
        error: bookingFailure,
      });
  }

  private convertDate(date: Date): string {
    return `${date.getFullYear()}-${(date.getMonth() + 1)
      .toString()
      .padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')}`;
  }

  get isInstitutionSelected(): boolean {
    return !!this.bookingFormGroup.get('institution').value;
  }

  calcCapacityDay(): void {
    const curr = new Date();
    const selected = this.bookingFormGroup.get('from_date').value;
    const diffTime = selected.getTime() - curr.getTime();
    const diffDays = diffTime / (1000 * 3600 * 24);
    this.capacityForDay = Math.ceil(diffDays);
  }
}
