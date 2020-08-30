import { Component, OnInit, Input, forwardRef } from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';

@Component({
  selector: 'app-institution-select',
  templateUrl: './institution-select.component.html',
  styleUrls: ['./institution-select.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InstitutionSelectComponent),
      multi: true,
    },
  ],
})
export class InstitutionSelectComponent implements ControlValueAccessor {

  @Input() institutions;

  institution: string;
  onChange: any;
  onTouch: any;
  isDisabled: boolean;

  constructor() {}

  get selectedInstitution(): string {
    return this.institution;
  }

  set selectedInstitution(inst: string) {
    this.institution = inst;
    if (this.onChange) this.onChange(inst);
    if (this.onTouch) this.onTouch();
  }

  writeValue(obj: string): void {
    this.institution = obj;
  }
  registerOnChange(fn: any): void {
    this.onChange = fn;
  }
  registerOnTouched(fn: any): void {
    this.onTouch = fn;
  }
  setDisabledState?(isDisabled: boolean): void {
    this.isDisabled = isDisabled;
  }

}
