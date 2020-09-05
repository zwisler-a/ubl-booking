import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { RouterModule } from '@angular/router';
import { ContentLoaderModule } from '@ngneat/content-loader';
import { SharedModule } from 'src/app/shared/shared.module';

import { BookingListComponent } from './booking-list.component';
import { HammerModule } from '@angular/platform-browser';

@NgModule({
  declarations: [BookingListComponent],
  imports: [
    CommonModule,
    MatListModule,
    MatButtonModule,
    RouterModule,
    MatIconModule,
    FlexLayoutModule,
    SharedModule,
    ContentLoaderModule
  ],
  exports: [BookingListComponent],
})
export class BookingListModule {}
