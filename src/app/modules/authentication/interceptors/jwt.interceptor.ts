import { Injectable } from '@angular/core';
import {
    HttpRequest,
    HttpHandler,
    HttpEvent,
    HttpInterceptor,
    HttpErrorResponse
} from '@angular/common/http';
import {
    Observable,
    BehaviorSubject,
    throwError
} from 'rxjs';
import { AuthenticationService } from '../services';
import {
    switchMap,
    catchError,
    filter,
    take
} from 'rxjs/operators';
import { AuthenticationResourceConstants } from '../constants/authenticationResource.constants';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {

    private isRefreshing = false;
    private refreshTokenSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null);

    constructor(private authenticationService: AuthenticationService) {
    }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const loggedIn = this.authenticationService.getToken();
        if (loggedIn) {
            request = this.addToken(request, loggedIn);
        }
        return next.handle(request).pipe(catchError(error => {
            if (error instanceof HttpErrorResponse && (error.status === 401 || error.status === 403)) {
                return this.handle401Error(request, next);
            } else {
                return throwError(error);
            }
        }));
    }

    private addToken(request: HttpRequest<any>, token: string) {
        return request.clone({
            setHeaders: {
                Authorization: `Bearer ${token}`
            }
        });
    }

    private handle401Error(request: HttpRequest<any>, next: HttpHandler) {
        if (!this.isRefreshing) {
            this.isRefreshing = true;
            this.refreshTokenSubject.next(null);
            return this.authenticationService.refresh().pipe(
                switchMap((isSign: boolean) => {
                    this.isRefreshing = false;
                    const token = this.authenticationService.getToken();
                    this.refreshTokenSubject.next(token);
                    return next.handle(this.addToken(request, token));
                }));

        } else {
            return this.refreshTokenSubject.pipe(
                filter(token => token != null),
                take(1),
                switchMap(jwt => {
                    return next.handle(this.addToken(request, jwt));
                }));
        }
    }
}
