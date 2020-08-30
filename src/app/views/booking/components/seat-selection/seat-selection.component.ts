import { Component, OnInit, Input, forwardRef } from '@angular/core';
import { Timeslot } from 'src/app/types/timeslots.type';
import {
  ControlValueAccessor,
  FormBuilder,
  FormGroup,
  NG_VALUE_ACCESSOR,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-seat-selection',
  templateUrl: './seat-selection.component.html',
  styleUrls: ['./seat-selection.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SeatSelectionComponent),
      multi: true,
    },
  ],
})
export class SeatSelectionComponent implements OnInit, ControlValueAccessor {
  @Input() areas: string[];
  @Input() timeslots: Timeslot;


  seatSelectGroup: FormGroup;
  onChange: any;
  onTouch: any;

  constructor(private fb: FormBuilder) {
    this.seatSelectGroup = fb.group({
      day: [new Date(), Validators.required],
      timeStart: ['', Validators.required],
      timeEnd: ['', Validators.required],
      accessories: [''],
      area: ['', Validators.required],
    });
    this.seatSelectGroup.valueChanges.subscribe((value) => {
      if (this.onChange) this.onChange(value);
    });
    this.seatSelectGroup.statusChanges.subscribe(() => {
      if (this.seatSelectGroup.touched && this.onTouch) this.onTouch();
    });
  }

  writeValue(obj: any): void {
    this.seatSelectGroup.setValue(
      Object.assign(
        {
          day: new Date(),
          timeStart: null,
          timeEnd: null,
          accessories: null,
          area: null,
        },
        obj
      )
    );
  }
  registerOnChange(fn: any): void {
    this.onChange = fn;
  }
  registerOnTouched(fn: any): void {
    this.onTouch = fn;
  }
  setDisabledState?(isDisabled: boolean): void {
    if (isDisabled) {
      this.seatSelectGroup.disable();
    } else {
      this.seatSelectGroup.enable();
    }
  }

  ngOnInit(): void {}
}
