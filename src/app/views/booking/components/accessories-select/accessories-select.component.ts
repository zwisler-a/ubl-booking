import { Component, Input } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-accessories-select',
  templateUrl: './accessories-select.component.html',
  styleUrls: ['./accessories-select.component.css'],
})
export class AccessoriesSelectComponent {
  accessories = {
    'mit Strom': 'mit Stromanschluss',
    PC: 'mit PC',
    'kein PC': 'ohne PC',
    LAN: 'mit LAN-Anschluss',
    Steharbeitsplatz: 'Steharbeitsplatz',
  };

  @Input() control: FormControl;

  constructor() {}
}
