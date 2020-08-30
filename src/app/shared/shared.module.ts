import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoadingButtonComponent } from './loading-button/loading-button.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { FlexLayoutModule } from '@angular/flex-layout';
import { AreaSanitationPipe } from './area-sanitation/area-sanitation.pipe';
import { DayStringPipe } from './day-string/day-string.pipe';

@NgModule({
  declarations: [LoadingButtonComponent, AreaSanitationPipe, DayStringPipe],
  imports: [CommonModule, MatButtonModule, MatIconModule, MatProgressSpinnerModule, FlexLayoutModule],
  exports: [LoadingButtonComponent, AreaSanitationPipe, DayStringPipe],
})
export class SharedModule {}
