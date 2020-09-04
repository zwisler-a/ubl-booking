import { HttpClientModule } from '@angular/common/http';
import { NgModule, LOCALE_ID } from '@angular/core';
import { MAT_DATE_LOCALE } from '@angular/material/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RoutingModule } from './routing/routing.module';

import { AppComponent } from './app.component';
import { AuthService } from './service/auth/auth.service';
import { ShellModule } from './shell/shell.module';
import { BookingInformationModule } from './views/booking-information/booking-information.module';
import { BookingListModule } from './views/booking-list/booking-list.module';
import { BookingModule } from './views/booking/booking.module';
import { CancelationWithCodeModule } from './views/cancelation-with-code/cancelation-with-code.module';
import { DisclaimerModule } from './views/disclaimer/disclaimer.module';
import { LoginModule } from './views/login/login.module';
import { LoggingModule } from './service/logging/logging.module';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { registerLocaleData } from '@angular/common';
import localeDe from '@angular/common/locales/de';
registerLocaleData(localeDe)

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,

    ShellModule,
    LoginModule,
    DisclaimerModule,
    CancelationWithCodeModule,
    BookingListModule,
    BookingInformationModule,
    BookingModule,

    LoggingModule,
    RoutingModule,
    HttpClientModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.featureFlags.serviceWorker }),
  ],
  providers: [AuthService, { provide: MAT_DATE_LOCALE, useValue: 'de-DE' }, {provide: LOCALE_ID, useValue: 'de-DE' }],
  bootstrap: [AppComponent],
})
export class AppModule {}
