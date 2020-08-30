import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { shareReplay, map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Timeslot } from '../../types/timeslots.type';
import { ErrorService } from '../error/error.service';

@Injectable({
  providedIn: 'root',
})
export class InstitutionService {
  private readonly institutionApi = environment.api.basePath + environment.api.institution;
  private readonly timeslotsApi = environment.api.basePath + environment.api.timeslots;
  private readonly areasApi = environment.api.basePath + environment.api.areas;

  constructor(private http: HttpClient, private errorSerivce: ErrorService) {}

  getInstitutions(): Observable<string[]> {
    return this.http.get(this.institutionApi, { responseType: 'text' }).pipe(
      map((response: string) => response.split('#')),
      this.errorSerivce.catchInstitutionsError(),
      shareReplay(1)
    );
  }

  getTimesolts(institution: string): Observable<Timeslot> {
    const queryParams = new HttpParams().set('institution', institution);
    return this.http
      .get<Timeslot>(this.timeslotsApi, { params: queryParams })
      .pipe(this.errorSerivce.catchTimeslotsError());
  }

  getAreas(institution: string): Observable<string[]> {
    const queryParams = new HttpParams().set('institution', institution);
    return this.http.get(this.areasApi, { params: queryParams, responseType: 'text' }).pipe(
      this.errorSerivce.catchAreasError(),
      map((response: string) => response.split('#'))
    );
  }
}
