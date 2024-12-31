import {
  importProvidersFrom,
  provideZoneChangeDetection
} from '@angular/core';
import {provideRouter, withComponentInputBinding} from '@angular/router';

import { routes } from './app.routes';
import {HTTP_INTERCEPTORS, provideHttpClient, withInterceptorsFromDi} from '@angular/common/http';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {PopupService} from './services/popup.service';
import {HttpErrorInterceptor} from './config/HttpErrorInterceptor';

export const appConfig = {
  providers: [
    provideRouter(routes, withComponentInputBinding()),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideHttpClient(withInterceptorsFromDi()),
    importProvidersFrom([BrowserAnimationsModule]),
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpErrorInterceptor,
      multi: true,
      deps: [PopupService]
    }
  ]
};
