import { Directive, HostListener, ElementRef } from '@angular/core';
import {
  Overlay,
  FlexibleConnectedPositionStrategy,
  ConnectionPositionPair,
} from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import { UserPopupComponent } from '../user-popup/user-popup.component';

@Directive({
  selector: '[appUserPopup]',
})
export class UserPopupDirective {
  constructor(private overlay: Overlay, private el: ElementRef) {}

  @HostListener('click')
  openPopup(): void {
    const overlayRef = this.overlay.create({
      positionStrategy: this.overlay
        .position()
        .flexibleConnectedTo(this.el)
        .withPositions(this.getPositions()),
      hasBackdrop: true,
      backdropClass: 'cdk-overlay-transparent-backdrop',
    });
    const userProfilePortal = new ComponentPortal(UserPopupComponent);
    overlayRef
      .attach(userProfilePortal)
      .instance.closePanel.subscribe(() => overlayRef.dispose());
    overlayRef.backdropClick().subscribe(() => {
      overlayRef.dispose();
    });
  }

  private getPositions(): ConnectionPositionPair[] {
    return [
      {
        originX: 'center',
        originY: 'top',
        overlayX: 'center',
        overlayY: 'bottom',
      },
      {
        originX: 'center',
        originY: 'bottom',
        overlayX: 'center',
        overlayY: 'top',
      },
    ];
  }
}
