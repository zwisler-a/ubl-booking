import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class WorkloadService {
  private readonly workloadApi = environment.api.basePath + environment.api.workload;
  constructor(private http: HttpClient) {}

  getWorkload(institution: string): any {
    const queryParams = new HttpParams().set('institution', institution);
    return this.http
      .get(this.workloadApi, { params: queryParams, responseType: 'text' })
      .pipe(this.workloadParser());
  }

  private workloadParser(): any {
    return map((wl: string) => {
      const parsed = [];
      // 8 * 16
      const hReg = '<th>(.*?) Uhr</th>';
      const startHour = Number.parseInt(new RegExp(hReg).exec(wl)[1], 10);
      const hours = wl.match(new RegExp(hReg, 'g')).length;
      // tslint:disable-next-line: no-string-literal
      parsed['startHour'] = startHour;
      // tslint:disable-next-line: no-string-literal
      parsed['hours'] = hours;
      const parts = wl
        .match(new RegExp(`<td style='background-color:(.*?)'>`, 'g'))
        .map((r) => /<td style='background-color:(.*?)'>/.exec(r)[1]);
      for (let i = 0; i < 8; i++) {
        const day = [];
        for (let j = 0; j < hours; j++) {
          const value = parts[j * 8 + i];
          day.push({ green: 0, yellow: 1, red: 2 }[value]);
        }
        parsed.push(day);
      }
      return parsed;
    });
  }
}
