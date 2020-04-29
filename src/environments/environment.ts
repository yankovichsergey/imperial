// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.
import *  as  googleApi from 'src/assets/dev-microsoft-api.json';

const keys: any = (googleApi as any).default;

export const environment = {
    production: false,
    mock: false,
    apiUrl: 'http://localhost:4200',
    apiWebPrefics: 'api/',
    apiWebHost: 'https://localhost:44388/',
    userProfileKeyStorage: '__userProfileKeyStorageImperial_dev__',
    auth: {
        paccesToken: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiIxOTIuMTY4LjEuMjAxIiwiZXh0IjoxNTczMTQ5Mzk0LCJpZCI6MzM3fQ.JvXvIczx1qupUnAtGpoWKvQjXutHDBINLB228dQpq_Y',
        superUserPassword: 'admin'
    },
    authority: 'https://login.microsoftonline.com/common/',
    apiAccessUrl: 'api://58f8afe9-ab33-4302-8b19-cc7489edc841/api-access',
    clientId: '58f8afe9-ab33-4302-8b19-cc7489edc841',
    redirectUri: 'https://yankovichsergey.github.io/imperialTest/serv-okc',
    postLogoutRedirectUri: 'https://yankovichsergey.github.io/imperialTest/serv-okc',
    driveId: keys.driveId,
    dropdownSheetId: keys.dropdownSheetId,
    folderId: keys.folderId,
    resultSheetId: keys.resultSheetId
};


