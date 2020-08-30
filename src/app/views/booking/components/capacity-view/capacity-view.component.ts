import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-capacity-view',
  templateUrl: './capacity-view.component.html',
  styleUrls: ['./capacity-view.component.css'],
})
export class CapacityViewComponent implements OnInit {
  @Input() capacity: number[];
  @Input() startHour: number;
  @Input() title: string;

  constructor() {}

  ngOnInit(): void {}
}
