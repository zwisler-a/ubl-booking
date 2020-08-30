import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'capacityTime',
})
export class CapacityTimePipe implements PipeTransform {
  transform(value: number, start = 8): unknown {
    return value + start + ' Uhr';
  }
}
