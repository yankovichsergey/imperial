import { AuthenticatedUserModel } from 'src/app/modules/authentication/models';

export class ContractsHelper {
    public static createAuthenticatedUserModel(): AuthenticatedUserModel {
        const item = new AuthenticatedUserModel();
        item.userGlobalKey = '123234';
        item.refreshToken = 'tgtrehtre.rhtreyh.rthtreh';
        item.accessToken = 'dfghfrh.fhdfrge.trhtrgeh';
        item.userName = 'userName1';
        return item;
    }

}
