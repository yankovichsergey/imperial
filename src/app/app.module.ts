import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
    HTTP_INTERCEPTORS,
    HttpClientModule
} from '@angular/common/http';
import { ApplicationModule } from './modules/application.module';
import { AppRoutingModule } from './appRouting.module';
import { AppComponent } from './app.component';
import {
    LayoutModule
} from './layout';
import { environment } from '../environments/environment';
import { AuthErrorInterceptor, JwtInterceptor } from './modules/authentication/interceptors';
import {
    CashInterceptor,
    HttpRequestInterceptor
} from './common/interceptors';
import { FakeBackendInterceptor } from 'src/testing';
import { developmentFakeBackendProvider } from './common/interceptors/developmentFakeBackend.interceptor';
import {
    MSAL_CONFIG,
    MSAL_CONFIG_ANGULAR,
    MsalAngularConfiguration,
    MsalInterceptor,
    MsalModule,
    MsalService
} from '@azure/msal-angular';
import { Configuration } from 'msal';

export const isMock = environment.mock;

export const protectedResourceMap: [string, string[]][] = [
    ['https://buildtodoservice.azurewebsites.net/api/todolist', [environment.apiAccessUrl]],
    ['https://graph.microsoft.com/v1.0/me', ['user.read']]
];

const isIE = window.navigator.userAgent.indexOf('MSIE ') > -1 || window.navigator.userAgent.indexOf('Trident/') > -1;

function MSALConfigFactory(): Configuration {
    return {
        auth: {
            clientId: environment.clientId,
            authority: environment.authority,
            validateAuthority: true,
            redirectUri: environment.redirectUri,
            postLogoutRedirectUri: environment.postLogoutRedirectUri,
            navigateToLoginRequestUrl: true,
        },
        cache: {
            cacheLocation: 'localStorage',
            storeAuthStateInCookie: isIE,
        },
    };
}

function MSALAngularConfigFactory(): MsalAngularConfiguration {
    return {
        popUp: !isIE,
        consentScopes: [
            'user.read',
            'openid',
            'profile',
            'offline_access',
            'files.read',
            'files.readWrite',
            'files.readWrite.all',
            'sites.readWrite.all',
            'sites.Read.All',
            'user.readBasic.all',
            'files.readWrite.appFolder',
            environment.apiAccessUrl
        ],
        unprotectedResources: ['https://www.microsoft.com/en-us/'],
        protectedResourceMap,
        extraQueryParameters: {}
    };
}

@NgModule({
    declarations: [
        AppComponent,
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        HttpClientModule,
        LayoutModule,
        ApplicationModule,
        AppRoutingModule,
        MsalModule
    ],
    providers: [
        {
            provide: HTTP_INTERCEPTORS,
            useClass: MsalInterceptor,
            multi: true
        },
        /*{
            provide: HTTP_INTERCEPTORS,
            useClass: JwtInterceptor,
            multi: true
        },*/
        {
            provide: MSAL_CONFIG,
            useFactory: MSALConfigFactory
        },
        {
            provide: MSAL_CONFIG_ANGULAR,
            useFactory: MSALAngularConfigFactory
        },
        MsalService,
        {
            provide: HTTP_INTERCEPTORS,
            useClass: CashInterceptor,
            multi: true
        },
        {
            provide: HTTP_INTERCEPTORS,
            useClass: isMock ? FakeBackendInterceptor : HttpRequestInterceptor,
            multi: true
        },
        // TODO:SM: after will be implemented all api need to remove
        developmentFakeBackendProvider,
        {provide: HTTP_INTERCEPTORS, useClass: AuthErrorInterceptor, multi: true},
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
