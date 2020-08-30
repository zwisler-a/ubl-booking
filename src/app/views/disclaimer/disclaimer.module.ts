import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DisclaimerComponent } from './disclaimer.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { FlexLayoutModule } from '@angular/flex-layout';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [DisclaimerComponent],
  imports: [CommonModule, MatButtonModule, MatIconModule, FlexLayoutModule,SharedModule],
  exports: [DisclaimerComponent],
})
export class DisclaimerModule {}
