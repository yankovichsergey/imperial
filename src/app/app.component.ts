import { Component, OnInit } from '@angular/core';
import { ROUTER_TRANSITION } from '@appConstants';
import { AuthenticationService } from './modules/authentication/services/authentication.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    animations: [ROUTER_TRANSITION],
})

export class AppComponent implements OnInit {

    public isIframe: boolean;

    constructor(
        private authService: AuthenticationService
    ) {
        this.isIframe = false;
    }

    public ngOnInit(): void {
        this.isIframe = window !== window.parent && !window.opener;
        this.authService.singIn();
    }

    public getState(outlet: any) {
        return outlet && outlet.activatedRouteData && outlet.activatedRouteData.animation;
    }
}
