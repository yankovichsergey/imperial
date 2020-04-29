import {
    Injectable
} from '@angular/core';
import {
    CryptoUtils,
    Logger
} from 'msal';
import { MsalService } from '@azure/msal-angular';


@Injectable({
    providedIn: 'root'
})

export class AuthenticationService {

    constructor(
        private msalService: MsalService
    ) {
    }

    public singIn(): void {

        this.msalService.handleRedirectCallback((authError, response) => {
            if (authError) {
                console.error('Redirect Error: ', authError.errorMessage);
                return;
            }
            console.log('Redirect Success: ', response);
        });

        this.msalService.setLogger(new Logger((logLevel, message, piiEnabled) => {
            console.log('MSAL Logging: ', message);
        }, {
            correlationId: CryptoUtils.createNewGuid(),
            piiLoggingEnabled: false
        }));
    }

    public signOut(): void {
        this.msalService.logout();
    }

    public getToken(): string {
        const token = localStorage.getItem('msal.idtoken');
        return token;
    }

}
