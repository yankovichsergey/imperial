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
import { AuthenticationService } from '../services';
import {
    Router
} from '@angular/router';
import { AuthenticationResourceConstants } from '../constants';

@Injectable()
export class AuthErrorInterceptor implements HttpInterceptor {
    constructor(
        private router: Router,
        private authenticationService: AuthenticationService) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(request).pipe(catchError(err => {
            if (err.status === 403 || err.status === 401 || err.status === 404) {
                return this.logout(err);
            } else {
                return throwError(err);
            }
        }));
    }

    private logout(err: any): Observable<HttpEvent<any>> {
        // this.authenticationService.signOut();
        const queryParams = this.router.url.includes(AuthenticationResourceConstants.LOGIN_ROUTE) ? {} : { returnUrl: this.router.url };
        this.router.navigate([AuthenticationResourceConstants.LOGIN_ROUTE], { queryParams });
        return throwError(err);
    }


}
