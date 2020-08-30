import { LoggingLevel } from './loggin-levels.enum';
import { LogEntry } from './log-entry.type';

class GlobalLoggerClass {
  private subscribers: ((entry: LogEntry) => void)[] = [];
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
  private publish(entry: LogEntry): void {
    this.subscribers.forEach((sub) => {
      sub(entry);
    });
  }
  subscribe(subscriber: (entry: LogEntry) => void): void {
    this.subscribers.push(subscriber);
  }
}

export const GlobalLogger = new GlobalLoggerClass();
