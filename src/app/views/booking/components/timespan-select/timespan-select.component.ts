import { Component, OnInit, forwardRef, Input } from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor, FormControl } from '@angular/forms';

@Component({
  selector: 'app-timespan-select',
  templateUrl: './timespan-select.component.html',
  styleUrls: ['./timespan-select.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => TimespanSelectComponent),
      multi: true,
    },
  ],
})
export class TimespanSelectComponent  {
  @Input() controlFrom: FormControl;
  @Input() controlTo: FormControl;

  constructor() {}
}
