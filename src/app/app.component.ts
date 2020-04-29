import { Component, OnInit } from '@angular/core';
import { BroadcastService } from '@azure/msal-angular';
import { ROUTER_TRANSITION } from '@appConstants';
import { AuthenticationService } from './modules/authentication/services/authentication.service';
import { ConfigAppHelper } from './common/helpers';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    animations: [ROUTER_TRANSITION],
})

export class AppComponent implements OnInit {

    public isIframe: boolean;

    constructor(
        private authService: AuthenticationService,
        private broadcastService: BroadcastService
    ) {
        if (!ConfigAppHelper.isIE()) {
            localStorage.clear();
        }
        this.isIframe = false;
    }

    public ngOnInit(): void {
        this.isIframe = window !== window.parent && !window.opener;
        this.authService.singIn();
        this.refresh();
    }

    public getState(outlet: any) {
        return outlet && outlet.activatedRouteData && outlet.activatedRouteData.animation;
    }

    private refresh(): void {
        this.broadcastService.subscribe('msal:acquireTokenFailure', payload => {
            this.authService.redirect();
            console.log(payload);
        });
    }
}
