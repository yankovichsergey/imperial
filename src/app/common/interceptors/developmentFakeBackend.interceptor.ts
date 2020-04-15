import { Injectable } from '@angular/core';
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
export class DevelopmentFakeBackendInterceptor implements HttpInterceptor {

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
                    return error('Password is incorrect');
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
            .pipe(delay(500))
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

export let developmentFakeBackendProvider = {
    // use fake backend in place of Http service for backend-less development
    provide: HTTP_INTERCEPTORS,
    useClass: DevelopmentFakeBackendInterceptor,
    multi: true
};
