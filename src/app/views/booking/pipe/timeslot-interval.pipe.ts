import { Pipe, PipeTransform } from '@angular/core';

import { TimeslotInterval } from '../../../types/timeslot-interval.type';

@Pipe({
  name: 'timeslotInterval',
})
export class TimeslotIntervalPipe implements PipeTransform {
  private readonly days = {
    1: 'Sonntag',
    2: 'Montag',
    3: 'Dienstag',
    4: 'Mittwoch',
    5: 'Donnerstag',
    6: 'Freitag',
    7: 'Samstag',
  };

  transform(value: TimeslotInterval, ...args: unknown[]): unknown {
    return (
      this.getDayAsString(value.day) +
      value.from +
      ' Uhr - ' +
      value.until +
      ' Uhr'
    );
  }

  private getDayAsString(day) {
    if (!day) return '';
    return this.days[day] + ': ';
  }
}
