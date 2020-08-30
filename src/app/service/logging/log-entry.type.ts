import { LoggingLevel } from './loggin-levels.enum';

export class LogEntry {
  // tslint:disable-next-line: variable-name
  constructor(private _level: LoggingLevel, private _content: any[]) {}

  get level(): LoggingLevel {
    return this._level;
  }

  get content(): any {
    return this._content;
  }
}
