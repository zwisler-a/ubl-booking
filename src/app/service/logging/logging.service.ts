import { Injectable, ErrorHandler } from '@angular/core';
import { LogEntry } from './log-entry.type';
import { LoggingLevel } from './loggin-levels.enum';
import { GlobalLogger } from './global-logging-service';

@Injectable({
  providedIn: 'root',
})
export class LoggingService implements ErrorHandler {
  private currentLevel = LoggingLevel.DEBUG;
  constructor() {
    GlobalLogger.subscribe(this.publish.bind(this));
  }
  handleError(error: any): void {
    this.error(error);
  }

  debug(...content: any[]): void {
    this.publish(new LogEntry(LoggingLevel.DEBUG, content));
  }
  info(...content: any[]): void {
    this.publish(new LogEntry(LoggingLevel.INFO, content));
  }
  warn(...content: any[]): void {
    this.publish(new LogEntry(LoggingLevel.WARN, content));
  }
  error(...content: any[]): void {
    this.publish(new LogEntry(LoggingLevel.ERROR, content));
  }
  log(level: LoggingLevel, ...content: any[]): void {
    this.publish(new LogEntry(level, content));
  }
  publish(log: LogEntry): void {
    if (log.level >= this.currentLevel) {
      if (log.level === LoggingLevel.ERROR)
        return console.error(log.content[0]);
      if (log.level === LoggingLevel.WARN) return console.warn(log.content[0]);
      console.log(log.content[0]);
    }
  }
}
