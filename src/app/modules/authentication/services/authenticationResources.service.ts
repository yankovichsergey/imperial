import { Injectable } from '@angular/core';

import { AuthenticationResourceConstants } from '../constants/index';
import { Observable } from 'rxjs';
import { ResourceTemplatesService } from '@appServices';
import { AuthenticatedUserModel } from '../models';

@Injectable({ providedIn: 'root' })
export class AuthenticationResourcesService {

    private userkey = 'currentUser_imperial';

    constructor(
        private resourceTemplates: ResourceTemplatesService) { }

    public login(contract: any): Observable<any> {
        const data = this.resourceTemplates.post(AuthenticationResourceConstants.USER_AUTHENTICATE, contract);
        return data;
    }

    public saveUser(user: AuthenticatedUserModel) {
        localStorage.setItem(this.userkey, JSON.stringify(user));
    }

    public deleteUser() {
        localStorage.removeItem(this.userkey);
    }

    public refresh(contract: any): Observable<any> {
        const data = this.resourceTemplates.post(AuthenticationResourceConstants.USER_REFRESH, contract);
        return data;
    }

    public getUser(): AuthenticatedUserModel {
        const resultFromStorage = JSON.parse(localStorage.getItem(this.userkey));
        if (resultFromStorage) {
            const result = new AuthenticatedUserModel();
            result.accessToken = resultFromStorage.accessToken;
            result.refreshToken = resultFromStorage.refreshToken;
            result.userGlobalKey = resultFromStorage.userGlobalKey;
            result.userName = resultFromStorage.userName;
            return result;
        } else {
            return null;
        }
    }
}
