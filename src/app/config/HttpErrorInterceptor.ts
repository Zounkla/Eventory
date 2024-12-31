import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import {PopupService} from '../services/popup.service';

@Injectable()
export class HttpErrorInterceptor implements HttpInterceptor {

  constructor(private popupService: PopupService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 400) {
          this.popupService.openError('Invalid request');
        } else if (error.status === 404) {
          this.popupService.openError('Not Found');
        } else if (error.status === 500) {
          this.popupService.openError('Server Error');
        }
        return throwError(() => error);
      })
    );
  }
}
