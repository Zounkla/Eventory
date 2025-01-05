import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import {PopupService} from '../services/popup.service';

@Injectable()
export class HttpErrorInterceptor implements HttpInterceptor {

  constructor(private popupService: PopupService) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(request)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          let errorMessage = '';
          if (error.error instanceof ErrorEvent) {
            errorMessage = `Error: ${error.error.message}`;
            this.popupService.openWarning(error.error.message)
          } else {
            errorMessage = `Error Status: ${error.status}\nMessage: ${error.message}`;
            this.popupService.openError(error.message)
          }
          return throwError(() => errorMessage);
        })
      )
  }
}
