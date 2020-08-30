import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { OverlayRef } from '@angular/cdk/overlay';
import { AuthService } from 'src/app/service/auth/auth.service';

@Component({
  selector: 'app-user-popup',
  templateUrl: './user-popup.component.html',
  styleUrls: ['./user-popup.component.css'],
})
export class UserPopupComponent implements OnInit {

  @Output() closePanel = new EventEmitter<void>();

  get readerNumber(): string {
    return this.authService.getReaderNumber();
  }

  constructor(
    private authService: AuthService
  ) {}

  ngOnInit(): void {}

  logout(): void {
    this.closePanel.emit();
    this.authService.logout();
  }
}
