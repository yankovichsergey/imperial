import { MsalAngularConfiguration } from '@azure/msal-angular';
import { Configuration } from 'msal';
import { environment } from '../../../environments/environment';

export class ConfigAppHelper {

    public static protectedResourceMap: [string, string[]][] = [
        ['https://graph.microsoft.com/v1.0/me', ['user.read']]
    ];

    public static isIE(): boolean {
        const ua = window.navigator.userAgent;
        const isMsie = ua.indexOf('MSIE ') > -1;
        const isMsie11 = ua.indexOf('Trident/') > -1;
        const isEdge = ua.indexOf('Edge/') > -1;
        return isMsie || isMsie11 || isEdge;
    }

    public static MSALConfigFactory(): Configuration {
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
                storeAuthStateInCookie: true,
            },
        };
    }

    public static MSALAngularConfigFactory(): MsalAngularConfiguration {
        return {
            popUp: !ConfigAppHelper.isIE(),
            consentScopes: [
                'user.read',
                'openid',
                'profile',
                'files.read',
                'files.readWrite',
                'files.readWrite.all',
                'files.readWrite.appFolder',
                environment.apiAccessUrl
            ],
            unprotectedResources: ['https://www.microsoft.com/en-us/'],
            protectedResourceMap: ConfigAppHelper.protectedResourceMap,
            extraQueryParameters: {}
        };
    }
}
