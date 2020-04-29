import {
    Injectable
} from '@angular/core';
import {
    CryptoUtils,
    Logger
} from 'msal';
// import { MsalService } from '@azure/msal-angular';
import { environment } from '../../../../environments/environment';
import { Observable, Subject } from 'rxjs';
import * as Msal from 'msal';


@Injectable({
    providedIn: 'root'
})

export class AuthenticationService {

    private msalInstance: any;
    private subject: Subject<any>;

    public get userToken$(): Observable<string> {
        return this.subject.asObservable();
    }

    constructor(
        // private msalService: MsalService
    ) {
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

        // this.msalService.handleRedirectCallback((authError, response) => {
        //     if (authError) {
        //         console.error('Redirect Error: ', authError.errorMessage);
        //         return;
        //     }
        //     console.log('Redirect Success: ', response);
        // });
        //
        // this.msalService.setLogger(new Logger((logLevel, message, piiEnabled) => {
        //     console.log('MSAL Logging: ', message);
        // }, {
        //     correlationId: CryptoUtils.createNewGuid(),
        //     piiLoggingEnabled: false
        // }));
    }

    public signOut(): void {
        this.msalInstance.logout();
    }

    /*public refresh(): void {
        if (this.msalInstance.getAccount()) {
            this.msalInstance.acquireTokenSilent(this.getLoginRequest())
                .then(response => {
                    localStorage.setItem('access_token', response.accessToken);
                })
                .catch(error => {
                    if (error.name === 'InteractionRequiredAuthError') {
                        return this.msalInstance.acquireTokenPopup(this.getLoginRequest())
                            .then(response => {
                                localStorage.setItem('access_token', response.accessToken);
                            })
                            .catch(err => {
                                console.log(err);
                            });
                    }
                });
        } else {
            this.msalInstance.logout();
        }
    }*/

    public refresh(): Observable<any> {
        if (this.msalInstance.getAccount()) {
            return new Observable((observer: any) => {
                this.msalInstance.acquireTokenSilent(this.getLoginRequest())
                    .then(response => {
                        localStorage.setItem('access_token', response.accessToken);
                        observer.next(response.accessToken);
                    })
                    .catch(err => {
                        console.log(err);
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
