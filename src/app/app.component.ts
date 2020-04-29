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

    constructor(
        private authService: AuthenticationService,
        private broadcastService: BroadcastService
    ) {
        if (!ConfigAppHelper.isIE()) {
            localStorage.clear();
        }
    }

    public ngOnInit(): void {
        this.authService.singIn();
        this.refresh();
    }

    public getState(outlet: any) {
        return outlet && outlet.activatedRouteData && outlet.activatedRouteData.animation;
    }

    private refresh(): void {
        this.broadcastService.subscribe('msal:acquireTokenFailure', payload => {
            this.authService.refresh();
        });
    }
}
