import { Component, OnInit } from '@angular/core';
import { ROUTER_TRANSITION } from '@appConstants';
import { AuthenticationService } from './modules/authentication/services/authentication.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    animations: [ROUTER_TRANSITION],
})

export class AppComponent implements OnInit {

    constructor(
        private authService: AuthenticationService
    ) {
    }

    public ngOnInit(): void {
        this.authService.singIn();
    }

    public getState(outlet: any) {
        return outlet && outlet.activatedRouteData && outlet.activatedRouteData.animation;
    }
}
