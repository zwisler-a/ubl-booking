import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dayString',
})
export class DayStringPipe implements PipeTransform {
  transform(value: string, ...args: unknown[]): unknown {
    const splits = value.split('-');
    const year = splits[0];
    const month = splits[1];
    const day = splits[2];

    return `${day}.${month}.${year}`;
  }
}
