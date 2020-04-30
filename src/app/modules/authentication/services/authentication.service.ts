import {
    Injectable
} from '@angular/core';
import {
    Observable,
    Subject
} from 'rxjs';
import * as Msal from 'msal';
import { environment } from '../../../../environments/environment';


@Injectable({
    providedIn: 'root'
})

export class AuthenticationService {

    private msalInstance: any;
    private subject: Subject<any>;

    public get userToken(): Observable<string> {
        return this.subject.asObservable();
    }

    constructor() {
        const msalConfig = {
            auth: {
                clientId: environment.clientId,
                redirectUri: environment.redirectUri
            }
        };
        this.msalInstance = new Msal.UserAgentApplication(msalConfig);
        this.subject = new Subject<any>();
    }

    public singIn(): void {
        this.msalInstance.handleRedirectCallback((error, response) => {
        });

        this.msalInstance.loginPopup(this.getLoginRequest()).then(response => {
            this.msalInstance.acquireTokenSilent(this.getLoginRequest()).then((accessToken) => {
                localStorage.setItem('access_token', accessToken.accessToken);
                this.subject.next(accessToken.accessToken);
            });
        }).catch(err => {
            console.log(err);
        });
    }

    public signOut(): void {
        this.msalInstance.logout();
    }

    public refresh(): Observable<any> {
        const isAccount = this.msalInstance.getAccount();
        if (isAccount) {
            return new Observable((observer: any) => {
                this.msalInstance.acquireTokenSilent(this.getLoginRequest())
                    .then(response => {
                        localStorage.setItem('access_token', response.accessToken);
                        observer.next(response.accessToken);
                    })
                    .catch(err => {
                        observer.next(err);
                    });
            });
        }
    }

    public getToken(): string {
        const token = localStorage.getItem('access_token');
        return token;
    }

    private getLoginRequest(): any {
        return {
            scopes: [
                'user.read',
                'openid',
                'profile',
                'files.read',
                'files.readWrite'
            ]
        };

    }
}
