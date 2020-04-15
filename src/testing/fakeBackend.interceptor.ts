import { Injectable } from '@angular/core';
import { AuthenticatedUserModel } from '../app/modules/authentication/models/authenticatedUserModel';
import { createUUID } from '../app/common/helpers/uuid.helper';
import {
    HttpRequest,
    HttpResponse,
    HttpHandler,
    HttpEvent,
    HttpInterceptor,
    HTTP_INTERCEPTORS,
    HttpErrorResponse
} from '@angular/common/http';
import {
    DefaultUrlSerializer,
    UrlTree,
    Router
} from '@angular/router';
import {
    Observable,
    of,
    throwError
} from 'rxjs';
import {
    delay,
    mergeMap,
    materialize,
    dematerialize
} from 'rxjs/operators';
import { AuthenticationResourceConstants } from 'src/app/modules/authentication/constants';
import { environment } from 'src/environments/environment';

@Injectable()
export class FakeBackendInterceptor implements HttpInterceptor {

    private superUsers: Array<any> = [];

    constructor(private router: Router) {

        const superUser: any = {};
        superUser.userGlobalKey = '1';
        superUser.currentPassword = environment.auth.superUserPassword;
        superUser.firstName = 'admin';
        superUser.lastName = 'admin';
        superUser.email = 'admin';
        this.superUsers.push(superUser);
    }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        // wrap in delayed observable to simulate server api call
        return of(null).pipe(mergeMap(() => {
            const tree: UrlTree = this.router.parseUrl(request.url);
            if (request.url.endsWith(AuthenticationResourceConstants.LOGIN_ROUTE) && request.method === 'POST') {
                const user = this.superUsers.find(x => x.currentPassword === request.body.password);
                if (!user) {
                    return error('Username or password is incorrect');
                }
                return ok({
                    userGlobalKey: user.userGlobalKey,
                    accessToken: environment.auth.paccesToken
                });
            }
            // pass through any requests not handled above
            return next.handle(request);
        }))
            .pipe(materialize())
            .pipe(delay(50))
            .pipe(dematerialize());

        // private helper functions

        function ok(body) {
            return of(new HttpResponse({ status: 200, body }));
        }

        function unauthorised() {
            return throwError({ status: 401, error: { message: 'Unauthorised' } });
        }

        function error(message) {
            return throwError({ status: 400, error: { message } });
        }

    }


}

export let fakeBackendProvider = {
    // use fake backend in place of Http service for backend-less development
    provide: HTTP_INTERCEPTORS,
    useClass: FakeBackendInterceptor,
    multi: true
};
