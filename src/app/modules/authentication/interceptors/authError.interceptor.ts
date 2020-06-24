import { Injectable } from '@angular/core';
import {
    HttpRequest,
    HttpHandler,
    HttpEvent,
    HttpInterceptor
} from '@angular/common/http';
import {
    Observable,
    throwError
} from 'rxjs';
import { catchError } from 'rxjs/operators';
import * as alertify from 'alertifyjs';

@Injectable()
export class AuthErrorInterceptor implements HttpInterceptor {
    constructor() {
    }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(request).pipe(catchError(err => {
            if (err.status === 404) {
                alertify.error(err.error.error.message);
                return throwError(err);
            } else if (err.status === 401 || err.status === 403) {
                return throwError(err);
            } else {
                return throwError(err);
            }
        }));
    }
}
