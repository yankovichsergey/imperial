import {
    Injectable
} from '@angular/core';
import {
    Observable,
    Subject
} from 'rxjs';
import {
    UserAgentApplication,
    AuthResponse,
    Configuration
} from 'msal';
import { environment } from '../../../../environments/environment';


@Injectable({
    providedIn: 'root'
})

export class AuthenticationService {

    private msalInstance: UserAgentApplication;
    private subject: Subject<any>;

    public get userToken(): Observable<string> {
        return this.subject.asObservable();
    }

    constructor() {
        const msalConfig: Configuration = {
            auth: {
                clientId: environment.clientId,
                redirectUri: environment.redirectUri,
                navigateToLoginRequestUrl: true
            }
        };
        this.msalInstance = new UserAgentApplication(msalConfig);
        this.subject = new Subject<any>();
    }

    public singIn(): void {
        this.msalInstance.handleRedirectCallback((error, response) => {
        });

        if (!this.msalInstance.getAccount()) {
            this.msalInstance.loginRedirect(this.getLoginRequest());
        } else {
            this.msalInstance.acquireTokenSilent(this.getLoginRequest()).then((accessToken: AuthResponse) => {
                localStorage.setItem('access_token', accessToken.accessToken);
                this.subject.next(accessToken.accessToken);
            }).catch((error: any) => {
                console.log(error);
            });
        }


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
        const isAccount = this.msalInstance.getAccount();
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
