import { Injectable } from '@angular/core';

import { AuthService } from '../auth/auth.service';
import { FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export class PreferencesService {
  constructor(private authService: AuthService) {}

  getPreferedInstitution(): string {
    return localStorage.getItem(this.authService.getReaderNumber() + ':institution');
  }
  setPreferedInstitution(value): void {
    return localStorage.setItem(this.authService.getReaderNumber() + ':institution', value);
  }

  getPreferedSeat(institution: string, bookingGroup: FormGroup): any {
    const currentValues = bookingGroup.getRawValue();
    const pref = JSON.parse(
      localStorage.getItem(this.authService.getReaderNumber() + institution + ':seat') || '{}'
    );

    bookingGroup.get('area').setValue(pref.area || 'no selection');
    bookingGroup.get('fitting').setValue(pref.fitting || []);

    bookingGroup.get('from_date').setValue(currentValues.from_date || new Date());
    bookingGroup.get('from_time').setValue(currentValues.from_time || pref.from_time || `${new Date().getHours() + 1}:00`);
    bookingGroup.get('until_time').setValue(currentValues.until_time || pref.until_time || null);
  }

  setPreferedSeat(institution: string, bookingGroup: FormGroup): any {
    const savedConfig = Object.assign({}, bookingGroup.getRawValue());
    localStorage.setItem(
      this.authService.getReaderNumber() + institution + ':seat',
      JSON.stringify(savedConfig)
    );
  }
}
