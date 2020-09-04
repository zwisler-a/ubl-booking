import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { combineLatest, Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

import { ROUTE } from '../../routing/routes.enum';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly loginApiUrl = environment.api.basePath + environment.api.login;
  private readonly logoutApiUrl = environment.api.basePath + environment.api.logout;

  private loginToken: string;
  private readerNumber: string;
  private password: string;
  private loginTokenAdmin: string;

  constructor(private http: HttpClient, private router: Router) {}

  authenticate(readerNumber: string, password: string): Observable<{ success: boolean; message: string }> {
    return combineLatest([
      this.loginRequest(readerNumber, password, '0'),
      this.loginRequest(readerNumber, password, '1'),
    ]).pipe(
      map(([response, response2]) => {
        if (response.token === 'null' || !response.token) return { success: false, message: response.msg };
        if (response2.token === 'null' || !response2.token) return { success: false, message: response.msg };

        this.loginToken = response.token;
        this.loginTokenAdmin = response2.token;
        this.readerNumber = readerNumber;
        this.password = password;
        return { success: true, message: response.msg };
      }),
      catchError(() => of({ success: false, message: 'Fehler beim Anmelden. Bitte versuche es erneut!' }))
    );
  }

  private loginRequest(
    readerNumber: string,
    password: string,
    logintype: string
  ): Observable<{ token: string; msg: string }> {
    const body = new HttpParams()
      .set('readernumber', readerNumber)
      .set('password', password)
      .set('logintype', logintype);
    return this.http.post<{ token: string; msg: string }>(this.loginApiUrl, body.toString(), {
      headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded'),
    });
  }

  logout(): void {
    combineLatest([
      this.logoutRequest({ token: this.getAdminToken(), readernumber: this.getReaderNumber() }),
      this.logoutRequest({ token: this.getToken(), readernumber: this.getReaderNumber() }),
    ]).subscribe();
    this.loginToken = null;
    this.readerNumber = null;
    this.password = null;
    this.router.navigate(['/', ROUTE.LOGIN]);
  }

  private logoutRequest(body: any): Observable<any> {
    return this.http.post(this.logoutApiUrl, JSON.stringify(body), {
      headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded'),
    });
  }

  refreshToken(): Observable<{ success: boolean; message: string }> {
    return this.authenticate(this.getReaderNumber(), this.getPassword());
  }

  isAuthenticated(): boolean {
    return !!this.loginToken;
  }

  getToken(): string {
    return this.loginToken;
  }

  getAdminToken(): string {
    return this.loginTokenAdmin;
  }

  getReaderNumber(): string {
    return this.readerNumber;
  }

  getPassword(): string {
    return this.password;
  }
}
