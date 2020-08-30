import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'areaSanitation',
})
export class AreaSanitationPipe implements PipeTransform {
  transform(value: unknown, altWorkspaceId: number): unknown {
    if (value !== 'no selection') return value;
    if (altWorkspaceId) return `Platz ${altWorkspaceId}`;
    return '';
  }
}
