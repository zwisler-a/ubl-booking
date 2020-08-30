import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MediaObserver } from '@angular/flex-layout';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-date-select',
  templateUrl: './date-select.component.html',
  styleUrls: ['./date-select.component.css'],
})
export class DateSelectComponent implements OnInit {
  @Input() control: FormControl;

  maxDate: Date;
  minDate: Date;

  constructor(private mediaObserver: MediaObserver) {
    mediaObserver.isActive('xs');
    this.minDate = new Date();
    this.maxDate = new Date();
    this.maxDate.setDate(this.maxDate.getDate() + 7);
  }
  ngOnInit(): void {}

  get isHandset(): boolean {
    return this.mediaObserver.isActive('xs');
  }
}
