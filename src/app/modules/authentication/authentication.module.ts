import { NgModule } from '@angular/core';
import { SharedModule } from '../../common/shared.module';
import { AuthenticationRoutingModule } from './authenticationRouting.module';
import { AuthGuard } from './guards';

const COMPONENTS = [
];

@NgModule({
    imports: [
        SharedModule,
        AuthenticationRoutingModule
    ],
    declarations: COMPONENTS,
    entryComponents: COMPONENTS,
    providers: [
        AuthGuard
    ]
})

export class AuthenticationModule {

}
