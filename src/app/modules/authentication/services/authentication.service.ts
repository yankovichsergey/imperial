import {
    Injectable
} from '@angular/core';
import {
    Observable,
    Subject
} from 'rxjs';
import {
    PublicClientApplication,
    Configuration,
    AuthenticationResult
} from '@azure/msal-browser';
import { environment } from '../../../../environments/environment';


@Injectable({
    providedIn: 'root'
})

export class AuthenticationService {

    private msalInstance: PublicClientApplication;
    private subject: Subject<string>;

    public get userToken(): Observable<string> {
        return this.subject.asObservable();
    }

    constructor() {
        const msalConfig: Configuration = {
            auth: {
                clientId: environment.clientId,
                redirectUri: environment.redirectUri,
                navigateToLoginRequestUrl: true
            },
            cache: {
                cacheLocation: 'localStorage',
                storeAuthStateInCookie: true
            }
        };
        this.msalInstance = new PublicClientApplication(msalConfig);
        this.subject = new Subject<string>();
    }

    public singIn(): void {

        const isAccount = this.msalInstance.getAllAccounts();

        this.msalInstance.handleRedirectPromise().then((response: AuthenticationResult) => {
            if (response) {
                localStorage.setItem('access_token', response.accessToken);
                this.subject.next(response.accessToken);
            } else {
                if (!isAccount) {
                    this.msalInstance.loginRedirect(this.getLoginRequest());
                } else {
                    this.acquireTokenSilent().then((res) => {
                        console.log(res);
                    });
                }
            }
        });


        /*this.msalInstance.loginPopup(this.getLoginRequest()).then(response => {
            this.msalInstance.acquireTokenSilent(this.getLoginRequest()).then((accessToken) => {
                localStorage.setItem('access_token', accessToken.accessToken);
                this.subject.next(accessToken.accessToken);
            });
        }).catch(err => {
            console.log(err);
        });*/
    }

    public signOut(): void {
        this.msalInstance.logout();
    }

    public refresh(): Observable<any> {
        const isAccount = this.msalInstance.getAllAccounts();
        return new Observable((observer: any) => {
            if (isAccount) {
                this.msalInstance.acquireTokenSilent(this.getLoginRequest())
                    .then(response => {
                        localStorage.setItem('access_token', response.accessToken);
                        observer.next(response.accessToken);
                    }).catch(err => {
                    observer.error(err);
                });
            }
        });
    }

    public getToken(): string {
        const token = localStorage.getItem('access_token');
        return token;
    }

    private async acquireTokenSilent(): Promise<any> {
        return await this.msalInstance.acquireTokenSilent(this.getLoginRequest()).then((res: AuthenticationResult) => {
            localStorage.setItem('access_token', res.accessToken);
            this.subject.next(res.accessToken);
        }).catch((error: any) => {
            return this.msalInstance.acquireTokenRedirect(error).then(tokenResponse => {
                return tokenResponse;
            });
        });
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
