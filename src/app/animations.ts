import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';

export const rotateInOut = trigger('rotateInOut', [
  state('in', style({ opacity: 1 })),
  transition(':enter', [
    style({ opacity: 0, transform: 'translateY(-10%)' }),
    animate('100ms 100ms'),
  ]),
  transition(
    ':leave',
    animate('100ms', style({ opacity: 0, transform: 'translateY(10%)' }))
  ),
]);

export const fadeIn = trigger('fadeIn', [
  state('in', style({ opacity: 1 })),
  transition(':enter', [style({ opacity: 0 }), animate(150)]),
]);
