import { Injectable } from '@angular/core';
import { SwUpdate } from '@angular/service-worker';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',
})
export class SwVersionService {
  constructor(private swUpdate: SwUpdate, private snackbar: MatSnackBar) {
    if (this.swUpdate.isEnabled) {
      this.subscribeToSw();
    }
  }

  private subscribeToSw(): void {
    this.swUpdate.available.subscribe((ev) => {
      this.snackbar
        .open('Eine neue Version ist Verfügbar', 'Aktualisieren', { duration: -1 })
        .onAction()
        .subscribe(() => {
          this.swUpdate.activateUpdate();
        });
    });
  }

  checkForUpdates(): void {
    if (this.swUpdate.isEnabled) {
      this.swUpdate.checkForUpdate();
    }
  }
}
