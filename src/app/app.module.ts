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
    MsalInterceptor,
    MsalModule,
    MsalService
} from '@azure/msal-angular';
import { ConfigAppHelper } from './common/helpers';

export const isMock = environment.mock;

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
            useFactory: ConfigAppHelper.MSALConfigFactory
        },
        {
            provide: MSAL_CONFIG_ANGULAR,
            useFactory: ConfigAppHelper.MSALAngularConfigFactory
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
