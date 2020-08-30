import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { map, catchError } from 'rxjs/operators';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { of, Observable } from 'rxjs';
import { Router } from '@angular/router';
import { ROUTE } from '../../routing/routes.enum';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly loginApiUrl =
    environment.api.basePath + environment.api.login;

  private loginToken: string;
  private readerNumber: string;
  private password: string;

  constructor(private http: HttpClient, private router: Router) {}

  authenticate(
    readerNumber: string,
    password: string
  ): Observable<{ success: boolean; message: string }> {
    const body = new HttpParams()
      .set('readernumber', readerNumber)
      .set('password', password);
    return this.http
      .post(this.loginApiUrl, body.toString(), {
        headers: new HttpHeaders().set(
          'Content-Type',
          'application/x-www-form-urlencoded'
        ),
      })
      .pipe(
        map((response: { token: string; msg: string }) => {
          if (response.token === 'null' || !response.token)
            return { success: false, message: response.msg };

          this.loginToken = response.token;
          this.readerNumber = readerNumber;
          this.password = password;
          return { success: true, message: response.msg };
        }),
        catchError(() => of({ success: false, message: 'Fehler beim Anmelden. Bitte versuche es erneut!' }))
      );
  }

  logout(): void {
    this.loginToken = null;
    this.readerNumber = null;
    this.password = null;
    this.router.navigate(['/', ROUTE.LOGIN]);
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

  getReaderNumber(): string {
    return this.readerNumber;
  }

  getPassword(): string {
    return this.password;
  }
}
