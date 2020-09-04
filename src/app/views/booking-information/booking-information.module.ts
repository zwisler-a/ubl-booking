import { CommonModule, DatePipe } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { RouterModule } from '@angular/router';

import { BookingInformationComponent } from './booking-information.component';
import { ConfirmCancelationComponent } from './components/confirm-cancelation/confirm-cancelation.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { ContentLoaderModule } from '@ngneat/content-loader';

@NgModule({
  declarations: [BookingInformationComponent, ConfirmCancelationComponent],
  imports: [
    CommonModule,
    MatButtonModule,
    MatDialogModule,
    MatProgressSpinnerModule,
    FlexLayoutModule,
    MatIconModule,
    RouterModule,
    MatSnackBarModule,
    SharedModule,
    ContentLoaderModule
  ],
  providers: [DatePipe],
  exports: [BookingInformationComponent],
})
export class BookingInformationModule {}
