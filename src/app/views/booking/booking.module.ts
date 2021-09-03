import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TimeslotIntervalPipe } from './pipe/timeslot-interval.pipe';
import { SeatSelectionComponent } from './components/seat-selection/seat-selection.component';
import { BookingComponent } from './booking.component';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSelectModule } from '@angular/material/select';
import { MatNativeDateModule } from '@angular/material/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatIconModule } from '@angular/material/icon';
import { ContentLoaderModule } from '@ngneat/content-loader';
import { FlexLayoutModule } from '@angular/flex-layout';
import { SharedModule } from '../../shared/shared.module';
import { OpeningHoursComponent } from './components/opening-hours/opening-hours.component';
import { AreaSelectComponent } from './components/area-select/area-select.component';
import { AccessoriesSelectComponent } from './components/accessories-select/accessories-select.component';
import { DateSelectComponent } from './components/date-select/date-select.component';
import { TimespanSelectComponent } from './components/timespan-select/timespan-select.component';
import { InstitutionSelectComponent } from './components/institution-select/institution-select.component';
import { CapacityViewComponent } from './components/capacity-view/capacity-view.component';
import { CapacityTimePipe } from './components/capacity-view/capacity-time.pipe';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from 'src/environments/environment';

@NgModule({
  declarations: [
    BookingComponent,
    SeatSelectionComponent,
    TimeslotIntervalPipe,
    OpeningHoursComponent,
    AreaSelectComponent,
    AccessoriesSelectComponent,
    DateSelectComponent,
    TimespanSelectComponent,
    InstitutionSelectComponent,
    CapacityViewComponent,
    CapacityTimePipe
  ],
  imports: [
    SharedModule,

    CommonModule,
    MatInputModule,
    MatButtonModule,
    MatSnackBarModule,
    MatSelectModule,
    MatProgressSpinnerModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatIconModule,
    ContentLoaderModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    FormsModule,
  ],
})
export class BookingModule {}
