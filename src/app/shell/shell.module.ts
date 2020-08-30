import { OverlayModule } from '@angular/cdk/overlay';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';

import { PrivateLayoutComponent } from './private-layout/private-layout.component';
import { UserPopupDirective } from './private-layout/user-popup-directive/user-popup.directive';
import { UserPopupComponent } from './private-layout/user-popup/user-popup.component';
import { PublicLayoutComponent } from './public-layout/public-layout.component';

@NgModule({
  declarations: [
    PrivateLayoutComponent,
    PublicLayoutComponent,
    UserPopupComponent,
    UserPopupDirective,
  ],
  imports: [
    CommonModule,
    MatCardModule,
    FlexLayoutModule,
    MatIconModule,
    OverlayModule,
    MatButtonModule,
    RouterModule
  ],
  exports: [PrivateLayoutComponent, PublicLayoutComponent],
})
export class ShellModule {}
