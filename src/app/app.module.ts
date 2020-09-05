import { registerLocaleData } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import localeDe from '@angular/common/locales/de';
import { LOCALE_ID, NgModule } from '@angular/core';
import { MAT_DATE_LOCALE } from '@angular/material/core';
import { BrowserModule, HAMMER_GESTURE_CONFIG, HammerModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ServiceWorkerModule } from '@angular/service-worker';

import { environment } from '../environments/environment';
import { AppComponent } from './app.component';
import { HammerConfig } from './hammer-conifg';
import { RoutingModule } from './routing/routing.module';
import { AuthService } from './service/auth/auth.service';
import { LoggingModule } from './service/logging/logging.module';
import { ShellModule } from './shell/shell.module';
import { BookingInformationModule } from './views/booking-information/booking-information.module';
import { BookingListModule } from './views/booking-list/booking-list.module';
import { BookingModule } from './views/booking/booking.module';
import { CancelationWithCodeModule } from './views/cancelation-with-code/cancelation-with-code.module';
import { DisclaimerModule } from './views/disclaimer/disclaimer.module';
import { LoginModule } from './views/login/login.module';

registerLocaleData(localeDe);

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
    HammerModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.featureFlags.serviceWorker }),
  ],
  providers: [
    AuthService,
    { provide: MAT_DATE_LOCALE, useValue: 'de-DE' },
    { provide: LOCALE_ID, useValue: 'de-DE' },
    { provide: HAMMER_GESTURE_CONFIG, useClass: HammerConfig },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
