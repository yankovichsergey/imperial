import { Injectable } from '@angular/core';
import {
    Router,
    CanActivate,
    ActivatedRouteSnapshot,
    RouterStateSnapshot
} from '@angular/router';
import { AuthenticationService } from '../services';
import {
    Observable,
    Subscriber
} from 'rxjs';

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(
        private router: Router,
        private authenticationService: AuthenticationService
    ) {
    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        return new Observable((observable: Subscriber<boolean>) => {
            this.authenticationService.userToken.subscribe((isToken: string) => {
                if (!isToken) {
                    observable.next(false);
                }
                observable.next(true);
            });
        });
    }
}
