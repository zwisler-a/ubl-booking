import { Component, OnInit, Input } from '@angular/core';
import { TimeslotInterval } from 'src/app/types/timeslot-interval.type';

@Component({
  selector: 'app-opening-hours',
  templateUrl: './opening-hours.component.html',
  styleUrls: ['./opening-hours.component.css'],
})
export class OpeningHoursComponent implements OnInit {
  @Input() intervals: TimeslotInterval[];

  constructor() {}

  ngOnInit(): void {}
}
