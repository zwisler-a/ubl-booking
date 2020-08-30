import { NgModule, ErrorHandler } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoggingService } from './logging.service';

@NgModule({
  declarations: [],
  imports: [CommonModule],
  providers: [{ provide: ErrorHandler, useClass: LoggingService }],
})
export class LoggingModule {
  constructor(private logging: LoggingService) {
    this.logging.debug('Logging Module available');
  }
}
