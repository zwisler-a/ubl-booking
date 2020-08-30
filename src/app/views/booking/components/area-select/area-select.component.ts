import { Component, OnInit, Input, forwardRef, Self } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, NgControl, FormControl } from '@angular/forms';

@Component({
  selector: 'app-area-select',
  templateUrl: './area-select.component.html',
  styleUrls: ['./area-select.component.css'],
})
export class AreaSelectComponent implements OnInit {
  @Input() control: FormControl;

  @Input() areas: string[];

  constructor() {}

  ngOnInit(): void {}
}
