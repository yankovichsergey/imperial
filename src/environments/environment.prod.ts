import *  as  microsoftApi from 'src/assets/prod-microsoft-api.json';

const keys: any = (microsoftApi as any).default;

export const environment = {
  production: true,
  mock: false,
  apiUrl: 'http://localhost:4200',
  apiWebPrefics: 'api/',
  apiWebHost: 'https://cguschi4410vm:44388/',
  userProfileKeyStorage: '__userProfileKeyStorageImperial_dev__',
  auth: {
    paccesToken: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiIxOTIuMTY4LjEuMjAxIiwiZXh0IjoxNTczMTQ5Mzk0LCJpZCI6MzM3fQ.JvXvIczx1qupUnAtGpoWKvQjXutHDBINLB228dQpq_Y',
    superUserPassword: 'admin'
  },
  authority: 'https://login.microsoftonline.com/common/',
  apiAccessUrl: 'api://58f8afe9-ab33-4302-8b19-cc7489edc841/api-access',
  clientId: keys.clientId,
  redirectUri: keys.redirectUri,
  postLogoutRedirectUri: keys.postLogoutRedirectUri,
  driveId: keys.driveId,
  folderId: keys.folderId,
  imagesFolderId: keys.imagesFolderId
};


